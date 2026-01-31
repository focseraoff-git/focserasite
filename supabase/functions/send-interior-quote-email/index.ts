import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InteriorEmailRequest {
  email: string;
  name: string;
  intent: string; // e.g., "Full Home", "Kitchen"
  budgetTier: string;
  timeline: string;
  projectDescription: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload: InteriorEmailRequest = await req.json();

    const subject = `Prop: ${payload.intent} Inquiry Received - Focsera Interiors`;

    const htmlContent = `
     <!DOCTYPE html>
      <html>
      <body style="margin: 0; padding: 0; font-family: 'Georgia', serif; background-color: #0c0a09;">
        <div style="max-width: 600px; margin: 0 auto; padding: 0;">
          <!-- Header -->
          <div style="text-align: center; padding: 40px 20px; background: #1c1917; border-bottom: 2px solid #ca8a04;">
            <h1 style="margin: 0; font-size: 24px; color: #ffffff; letter-spacing: 2px; text-transform: uppercase;">Focsera Interiors</h1>
            <p style="margin: 5px 0 0; font-size: 10px; color: #ca8a04; letter-spacing: 4px; text-transform: uppercase;">Powered by Urban Elegance Interiors
</p>
          </div>
          
          <!-- Content -->
          <div style="background: #1c1917; padding: 40px; color: #d6d3d1;">
            <p style="font-size: 16px; margin-bottom: 24px;">Dear <strong>${payload.name}</strong>,</p>
            <p style="font-size: 15px; line-height: 1.8; margin-bottom: 30px;">Thank you for inquiring about our premium interior design services. We have received your request for a <strong>${payload.intent}</strong> project and are currently reviewing your requirements.</p>
            
            <!-- Details Box -->
            <div style="background: #292524; border: 1px solid #44403c; border-left: 4px solid #ca8a04; padding: 25px; margin-bottom: 30px;">
              <h3 style="margin: 0 0 20px; color: #ffffff; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Project Summary</h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding-bottom: 12px; color: #a8a29e; font-size: 12px; width: 100px;">BUDGET TIER</td>
                  <td style="padding-bottom: 12px; color: #ffffff; font-size: 14px;">${payload.budgetTier}</td>
                </tr>
                <tr>
                  <td style="padding-bottom: 12px; color: #a8a29e; font-size: 12px;">TIMELINE</td>
                  <td style="padding-bottom: 12px; color: #ffffff; font-size: 14px;">${payload.timeline}</td>
                </tr>
                <tr>
                  <td style="color: #a8a29e; font-size: 12px; vertical-align: top;">NOTES</td>
                  <td style="color: #ffffff; font-size: 14px; line-height: 1.5;">${payload.projectDescription}</td>
                </tr>
              </table>
            </div>

            <p style="font-size: 15px; line-height: 1.8;">Our design consultants will reach out to you shortly to schedule a preliminary consultation.</p>
           
              <span style="font-size: 10px; color: #57534e;">Hyderabad, India • +91  95158 03954</span>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: "Focsera Interiors <noreply@focsera.in>",
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
