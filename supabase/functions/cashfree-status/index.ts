import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const raw = await req.text();
    // defaulting to PROCESSING avoids breaking the frontend loop if empty, 
    // but usually we should fail if no data.
    if (!raw) return new Response(JSON.stringify({ status: "PROCESSING", reason: "no body" }), { headers: corsHeaders });

    const { orderId } = JSON.parse(raw);
    if (!orderId) return new Response(JSON.stringify({ status: "FAILED", reason: "no orderId" }), { headers: corsHeaders });

    const headers = {
      "x-client-id": Deno.env.get("CASHFREE_APP_ID")!,
      "x-client-secret": Deno.env.get("CASHFREE_SECRET_KEY")!,
      "x-api-version": "2023-08-01",
    };

    // 1. Fetch Order Status from Cashfree
    const orderRes = await fetch(`https://api.cashfree.com/pg/orders/${orderId}`, { headers });
    if (!orderRes.ok) {
       console.error("Cashfree API Error", await orderRes.text());
       // If order not found at Cashfree, it's definitely FAILED or invalid
       return new Response(JSON.stringify({ status: "FAILED", reason: "cashfree fetch failed" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const order = await orderRes.json();

    const payRes = await fetch(`https://api.cashfree.com/pg/orders/${orderId}/payments`, { headers });
    const payJson = await payRes.json();
    const payments = payJson?.data ?? [];

    console.log(`[Status Check] OrderID: ${orderId}, OrderStatus: ${order?.order_status}, Payments: ${payments.length}`);

    // 2. Determine "Real" Status
    const isPaid = order?.order_status === "PAID";
    const isFailed = 
      order?.order_status === "EXPIRED" || 
      order?.order_status === "USER_DROPPED" || 
      order?.order_status === "CANCELLED" || 
      order?.order_status === "VOID" ||
      (payments.length > 0 && payments.every((p: any) => 
        ["FAILED", "USER_DROPPED", "CANCELLED", "VOID"].includes(p.payment_status)
      ));

    // 3. Handle Failure
    if (isFailed && !isPaid) {
       console.log(`[Status Check] Detected FAILURE for ${orderId}. Updating DB...`);
       try {
         const supabase = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
         );
         const { error: updateError } = await supabase.from("promptx_bookings")
           .update({ payment_status: "FAILED" })
           .eq("order_id", orderId);
           
         if (updateError) console.error("DB Update Failed:", updateError);
         else console.log("DB Updated to FAILED");
         
       } catch (err) {
         console.error("Failed status update error:", err);
       }

       return new Response(JSON.stringify({ status: "FAILED", _v: "strict-v4" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // 4. Handle Pending/Processing
    if (!isPaid) {
      console.log(`[Status Check] Still PROCESSING. OrderStatus: ${order?.order_status}`);
      return new Response(JSON.stringify({ status: "PROCESSING", _v: "strict-v4" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // 5. Handle Success (isPaid === true)
    
    // Update DB
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch booking
    const { data: booking, error: bookingError } = await supabase
      .from("promptx_bookings")
      .select("payment_status, ticket_sent, email, student_name, class_level")
      .eq("order_id", orderId)
      .single();

    if (bookingError || !booking) {
      console.error("Booking not found in DB but Paid at Cashfree:", orderId);
      return new Response(JSON.stringify({ status: "SUCCESS", warn: "booking_missing" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Update status to SUCCESS if not already
    if (booking.payment_status !== "SUCCESS") {
      await supabase.from("promptx_bookings").update({ payment_status: "SUCCESS" }).eq("order_id", orderId);
    }

    // Trigger Email if not sent
    // Trigger Email if not sent (Concurrency/Dedup Check)
    // We attempt to set ticket_sent = true. If it was already true, this update returns 0 rows.
    const { data: flagData, error: flagError } = await supabase
      .from("promptx_bookings")
      .update({ ticket_sent: true })
      .eq("order_id", orderId)
      .eq("ticket_sent", false) // Atomic check
      .select();

    if (flagError) {
       console.error("DB Error flagging ticket_sent:", flagError);
    } else if (flagData && flagData.length > 0) {
       // We successfully claimed the "send" lock. Proceed to send.
       console.log("Claimed ticket_send lock. Sending email to", booking.email);
       
       const resendKey = Deno.env.get("RESEND_API_KEY");
       if (!resendKey) {
           console.error("Configuration Error: RESEND_API_KEY is missing in cashfree-status");
           // Revert flag so we can try again later? Or just fail?
           // Probably revert so an admin can retry or next webhook retry works.
           await supabase.from("promptx_bookings").update({ ticket_sent: false }).eq("order_id", orderId);
       } else {

           try {
               const emailRes = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${resendKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: Deno.env.get("FROM_EMAIL") || "PromptX <hello@focsera.in>",
                    to: [booking.email],
                    subject: "🎟️ You're In! PromptX Workshop Ticket",
                    html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                      <meta charset="utf-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>PromptX Workshop Ticket</title>
                    </head>
                    <body style="margin: 0; padding: 0; background-color: #020617; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                      
                      <!-- Outer Container -->
                      <div style="width: 100%; min-height: 100vh; padding: 40px 0; background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%);">
                        
                        <!-- Ticket Card -->
                        <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); border: 1px solid rgba(255,255,255,0.1);">
                          
                          <!-- Hero Image -->
                          <div style="position: relative; width: 100%; height: 240px; background-color: #000;">
                            <img src="https://focsera.in/images/logos/PromptX.jpg" alt="PromptX" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.9;">
                            <div style="position: absolute; inset: 0; background: linear-gradient(to top, #1e293b 0%, transparent 80%);"></div>
                            
                            <div style="position: absolute; bottom: 25px; left: 30px;">
                                <div style="display: inline-block; padding: 6px 12px; background: rgba(16, 185, 129, 0.2); border-radius: 100px; border: 1px solid rgba(16, 185, 129, 0.3); margin-bottom: 10px;">
                                    <span style="color: #34d399; font-size: 12px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">Confirmed Entry</span>
                                </div>
                                <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; line-height: 1;">PromptX</h1>
                                <p style="color: #cbd5e1; margin: 6px 0 0 0; font-size: 16px; font-weight: 500;">Generative AI Workshop</p>
                            </div>
                          </div>
    
                          <!-- Body Content -->
                          <div style="padding: 40px 30px; background-color: #1e293b;">
                            
                            <!-- Welcome -->
                            <div style="margin-bottom: 35px;">
                                <h2 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0 0 8px 0;">Hi ${booking.student_name.split(' ')[0]},</h2>
                                <p style="color: #94a3b8; font-size: 16px; line-height: 1.6; margin: 0;">
                                    Get ready to master AI! Your spot is secured for the PromptX Workshop. 
                                    Bring up your Energy and Curiosity.
                                </p>
                            </div>

                            <!-- Event Details Grid -->
                            <div style="background-color: #0f172a; border-radius: 16px; border: 1px solid #334155; overflow: hidden; margin-bottom: 35px;">
                                <div style="display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid #334155;">
                                    <div style="padding: 20px; border-right: 1px solid #334155;">
                                        <p style="margin: 0; color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Date</p>
                                        <p style="margin: 4px 0 0 0; color: #f1f5f9; font-size: 15px; font-weight: 600;">Jan 3rd, 2026</p>
                                    </div>
                                    <div style="padding: 20px;">
                                        <p style="margin: 0; color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Time</p>
                                        <p style="margin: 4px 0 0 0; color: #f1f5f9; font-size: 15px; font-weight: 600;">10:00 AM - 4:00 PM</p>
                                    </div>
                                </div>
                                <div style="padding: 20px;">
                                    <p style="margin: 0; color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">About</p>
                                    <p style="margin: 4px 0 0 0; color: #f1f5f9; font-size: 15px; font-weight: 600;">A hands-on workshop for students in Classes 7–10 to boost academic creativity & productivity using AI.

</p>
                                </div>
                            </div>

                            <!-- Perks Section -->
                            <div style="margin-bottom: 35px;">
                                <h3 style="color: #f8fafc; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin: 0 0 20px 0;">What's Included</h3>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                    
                                    <!-- Perk 1 -->
                                    <div style="background-color: #334155; padding: 15px; border-radius: 12px; display: flex; align-items: center; gap: 12px;">
                                        <div style="width: 32px; height: 32px; background-color: rgba(99, 102, 241, 0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                            <span style="font-size: 16px;">📜</span>
                                        </div>
                                        <span style="color: #e2e8f0; font-size: 13px; font-weight: 600;">Certificate</span>
                                    </div>

                                    <!-- Perk 2 -->
                                    <div style="background-color: #334155; padding: 15px; border-radius: 12px; display: flex; align-items: center; gap: 12px;">
                                        <div style="width: 32px; height: 32px; background-color: rgba(244, 63, 94, 0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                            <span style="font-size: 16px;">🍱</span>
                                        </div>
                                        <span style="color: #e2e8f0; font-size: 13px; font-weight: 600;">Hands-On Experience</span>
                                    </div>

                                    <!-- Perk 3 -->
                                    <div style="background-color: #334155; padding: 15px; border-radius: 12px; display: flex; align-items: center; gap: 12px;">
                                        <div style="width: 32px; height: 32px; background-color: rgba(16, 185, 129, 0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                            <span style="font-size: 16px;">🎒</span>
                                        </div>
                                        <span style="color: #e2e8f0; font-size: 13px; font-weight: 600;">Community Access</span>
                                    </div>

                                    <!-- Perk 4 -->
                                    <div style="background-color: #334155; padding: 15px; border-radius: 12px; display: flex; align-items: center; gap: 12px;">
                                        <div style="width: 32px; height: 32px; background-color: rgba(234, 179, 8, 0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                            <span style="font-size: 16px;">⚡</span>
                                        </div>
                                        <span style="color: #e2e8f0; font-size: 13px; font-weight: 600;">AI Tools Access</span>
                                    </div>
                                </div>
                            </div>
    
                            <!-- QR Section -->
                            <div style="text-align: center; padding-top: 30px; border-top: 1px dashed #475569;">
                              <p style="margin: 0 0 15px 0; color: #94a3b8; font-size: 12px; letter-spacing: 0.5px;">SCAN AT ENTRANCE</p>
                              <div style="display: inline-block; background-color: #ffffff; padding: 12px; border-radius: 16px;">
                                <img src="https://quickchart.io/qr?text=${encodeURIComponent(JSON.stringify({
                                    id: orderId,
                                    name: booking.student_name,
                                    class: booking.class_level,
                                    status: "Verified"
                                }))}&size=200&dark=020617&light=ffffff" alt="Ticket QR" width="160" height="160" style="display: block;">
                              </div>
                              <p style="margin: 15px 0 0 0; color: #64748b; font-family: monospace; font-size: 13px;">OID: ${orderId.substring(0, 12)}</p>
                            </div>
    
                          </div>
                          
                          <!-- Footer -->
                          <div style="background-color: #020617; padding: 25px; text-align: center; border-top: 1px solid #1e293b;">
                            <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 14px; font-weight: 600;">Need Help?</p>
                            <p style="margin: 0; color: #475569; font-size: 12px;">Contact us at <a href="mailto:info.focsera@gmail.com" style="color: #6366f1; text-decoration: none;">hello@focsera.in</a></p>
                            <p style="margin: 20px 0 0 0; color: #334155; font-size: 11px;">© 2026 Focsera Ecosystem. All rights reserved.</p>
                          </div>
    
                        </div>
                      </div>
                    </body>
                    </html>
                    `,
                }),
               });
    
               if (!emailRes.ok) {
                   const errText = await emailRes.text();
                   console.error(`Resend API Failed (${emailRes.status}):`, errText);
                   // Revert flag on API failure so we can retry?
                   // If we revert, we risk double sending if it actually went through but timed out.
                   // Safest is to NOT revert if status is 2xx, but here it is not ok.
                   // If it failed (4xx, 5xx), it probably didn't send. Revert.
                   await supabase.from("promptx_bookings").update({ ticket_sent: false }).eq("order_id", orderId);
               } else {
                   const emailData = await emailRes.json();
                   console.log("Email sent successfully via Inline:", emailData.id);
                   // Already flag=true in DB.
               }
           } catch (e) {
               console.error("Email network error:", e);
               // Network failed? Revert flag.
               await supabase.from("promptx_bookings").update({ ticket_sent: false }).eq("order_id", orderId);
           }
       }
    } else {
        console.log("Ticket already sent (or booking not found), skipping email.");
    }

    return new Response(JSON.stringify({ status: "SUCCESS", _v: "strict-v3" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (err) {
    console.error("STATUS ERROR:", err);
    // Return FAILED on critical structure error so frontend doesn't hang forever?
    // Or keep PROCESSING? If it's a code bug, PROCESSING hangs the user.
    // Let's return PROCESSING with error details so we can debug, but maybe FAILED is safer for user experience if it persists?
    // User requested: "make it updated if failed make failed if success turn it success"
    return new Response(JSON.stringify({ status: "PROCESSING", error: (err as Error).message }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

