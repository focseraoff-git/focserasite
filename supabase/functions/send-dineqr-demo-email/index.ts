import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface DemoRequest {
  restaurantName: string;
  contactName: string;
  email: string;
}

serve(async (req) => {
  // 1. Handle CORS (So your frontend can talk to this function)
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 2. Get data from Frontend
    const { restaurantName, contactName, email }: DemoRequest = await req.json();

    // 3. Check for API Key
    if (!Deno.env.get("RESEND_API_KEY")) {
      throw new Error("Missing RESEND_API_KEY");
    }

    // 4. Send the Email
    // CRITICAL: We use 'onboarding@resend.dev' until your domain is verified.
    const { data, error } = await resend.emails.send({
      from: "Focsera DineQR <onboarding@resend.dev>",
      to: [email], // Sends to the person who filled the form
      subject: "Confirmation: DineQR Demo Request Received",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0052CC;">Demo Request Received!</h1>
          <p>Hi <strong>${contactName}</strong>,</p>
          <p>Thanks for your interest in <strong>Focsera DineQR</strong> for <em>${restaurantName}</em>.</p>
          <p>We have received your details and our team will contact you shortly to schedule your demo.</p>
          <br/>
          <p>Best Regards,</p>
          <p>The Focsera Team</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return new Response(JSON.stringify({ error }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    return new Response(JSON.stringify({ data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Function Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});