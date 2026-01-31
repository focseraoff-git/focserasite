import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FebEmailRequest {
  email: string;
  name: string;
  theme: string;
  date: string;
  venue: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload: FebEmailRequest = await req.json();

    const subject = `❤️ Your '${payload.theme}' Session is Confirmed!`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #fff0f5;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; padding: 30px; background: linear-gradient(135deg, #ec4899 0%, #be185d 100%); border-radius: 20px 20px 0 0; color: white;">
            <h1 style="margin: 0; font-size: 32px;">Feb in Frames</h1>
            <p style="margin: 5px 0 0; font-size: 16px; opacity: 0.9;">Love is in the air!</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 20px 20px; box-shadow: 0 10px 30px rgba(236, 72, 153, 0.1);">
            <p style="font-size: 18px; color: #333;">Dearest <strong>${payload.name}</strong>,</p>
            <p style="font-size: 16px; color: #555; line-height: 1.6;">Thank you for choosing Focsera Studios to capture your beautiful moments this Valentine's season. We are thrilled to be part of your story!</p>
            
            <div style="background: #fff0f5; border: 2px solid #fbcfe8; border-radius: 15px; padding: 20px; margin: 25px 0;">
              <h3 style="margin: 0 0 15px; color: #be185d; text-align: center; text-transform: uppercase; font-size: 14px; letter-spacing: 1px;">Booking Details</h3>
              
              <div style="margin-bottom: 10px;">
                <span style="color: #9d174d; font-size: 12px; text-transform: uppercase; display: block; margin-bottom: 4px;">Theme Selected</span>
                <strong style="color: #be185d; font-size: 18px;">${payload.theme}</strong>
              </div>
              
              <div style="margin-bottom: 10px;">
                <span style="color: #9d174d; font-size: 12px; text-transform: uppercase; display: block; margin-bottom: 4px;">Date</span>
                <strong style="color: #333; font-size: 16px;">${payload.date}</strong>
              </div>
              
              <div>
                <span style="color: #9d174d; font-size: 12px; text-transform: uppercase; display: block; margin-bottom: 4px;">Venue</span>
                <strong style="color: #333; font-size: 16px;">${payload.venue}</strong>
              </div>
            </div>

            <p style="font-size: 16px; color: #333;"><strong>What's Next?</strong></p>
            <p style="font-size: 15px; color: #555; line-height: 1.6;">Our studio team will review your booking and contact you shortly to discuss specific shots, outfits, and timing. Get ready to shine!</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #fce7f3; text-align: center;">
              <p style="font-size: 12px; color: #999;">Focsera Studios • Made with ❤️ in Hyderabad</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: "Focsera Studios <noreply@focsera.in>",
      to: [payload.email],
      subject: subject,
      html: htmlContent,
    });

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
