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
    const { orderId } = await req.json();

    if (!orderId) {
      return new Response("Missing orderId", { status: 400, headers: corsHeaders });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data, error } = await supabase
      .from("promptx_bookings")
      .select("*")
      .eq("order_id", orderId)
      .single();

    if (error || !data) {
      return new Response("Booking not found", { status: 404, headers: corsHeaders });
    }

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: Deno.env.get("FROM_EMAIL") || "PromptX <hello@focsera.in>",
        to: [data.email],
        subject: "🎟️ Your PromptX Workshop Ticket",
        html: `
          <div style="font-family:Arial; max-width:600px; margin:auto;">
            <h2>🎉 Registration Confirmed!</h2>
            <p>Hello <strong>${data.student_name}</strong>,</p>
            <p>You have successfully registered for <strong>PromptX – AI Workshop</strong>.</p>
            <div style="padding:16px; border:1px solid #ddd; border-radius:8px;">
              <p><strong>Order ID:</strong> ${data.order_id}</p>
              <p><strong>Class:</strong> ${data.class_level}</p>
              <p><strong>Workshop Fee:</strong> ₹${data.amount}</p>
            </div>
            <p style="margin-top:16px;">📍 Please carry this email or a printout on the workshop day.</p>
            <p>Regards,<br/><strong>PromptX Team</strong></p>
          </div>
        `,
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error(errText);
      return new Response("Email failed", { status: 500, headers: corsHeaders });
    }

    return new Response("Email sent", { status: 200, headers: corsHeaders });

  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500, headers: corsHeaders });
  }
});
