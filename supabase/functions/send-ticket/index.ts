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
    // 1. Parse Input
    const { orderId } = await req.json();

    if (!orderId) {
      return new Response(JSON.stringify({ error: "Missing orderId" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // 2. Init Supabase
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // 3. Fetch Booking Data
    // We fetch fresh data to ensure we have the latest status/details
    const { data, error } = await supabase
      .from("promptx_bookings")
      .select("*")
      .eq("order_id", orderId)
      .single();

    if (error || !data) {
      console.error("Booking lookup failed for ticket:", orderId, error);
      return new Response(JSON.stringify({ error: "Booking not found" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // 4. Send Email via Resend
    console.log(`Sending ticket to ${data.email} for Order ${orderId}`);
    
    // Check for API Key
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
        console.error("RESEND_API_KEY is missing");
        return new Response(JSON.stringify({ error: "Configuration Error: No Email Key" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: Deno.env.get("FROM_EMAIL") || "PromptX <hello@focsera.in>",
        to: [data.email],
        subject: "🎟️ Your PromptX Workshop Ticket",
        html: `
          <div style="font-family:Arial, sans-serif; max-width:600px; margin:auto; background-color:#ffffff; color:#333;">
            <div style="text-align:center; padding: 24px 0; border-bottom: 3px solid #10b981;">
              <h1 style="color:#10b981; margin:0;">Registration Confirmed!</h1>
            </div>
            
            <div style="padding: 24px;">
              <p style="font-size:16px;">Hello <strong>${data.student_name}</strong>,</p>
              <p style="font-size:16px; line-height:1.5;">
                You have successfully secured your seat for <strong>PromptX – AI Workshop</strong>.
                We are excited to see you there!
              </p>
              
              <div style="background-color:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:20px; margin: 24px 0;">
                <h3 style="margin-top:0; color:#166534;">Ticket Details</h3>
                <p style="margin:8px 0;"><strong>Order ID:</strong> <span style="font-family:monospace;">${data.order_id}</span></p>
                <p style="margin:8px 0;"><strong>Student:</strong> ${data.student_name}</p>
                <p style="margin:8px 0;"><strong>Class:</strong> ${data.class_level}</p>
                <p style="margin:8px 0;"><strong>Date:</strong> Jan 3rd, 2026</p>
                <p style="margin:8px 0;"><strong>Amount Paid:</strong> ₹${data.amount}</p>
              </div>

              <p style="font-size:14px; color:#666;">
                📍 <strong>Important:</strong> Please present this email (digitally or printed) at the venue entrance.
              </p>
            </div>

            <div style="background-color:#f9fafb; padding:20px; text-align:center; border-top:1px solid #e5e7eb; font-size:12px; color:#999;">
              <p>Sent by PromptX Team • <a href="mailto:support@focsera.in" style="color:#10b981;">support@focsera.in</a></p>
            </div>
          </div>
        `,
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error("Resend API Error:", errText);
      return new Response(JSON.stringify({ error: "Resend API Failed", details: errText }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const emailData = await emailRes.json();
    console.log("Email sent successfully:", emailData.id);

    return new Response(JSON.stringify({ message: "Email sent", id: emailData.id }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (err) {
    console.error("SEND-TICKET EXCEPTION:", err);
    return new Response(JSON.stringify({ error: "Server Exception", details: err.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
