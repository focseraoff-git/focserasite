import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
    type?: 'card' | 'registration'; // Default to 'card' for backward compatibility
    email: string;
    name: string;
    flatNumber: string;
    phone: string;
    // Card specific
    cardCodes?: string[];
    participantNames?: string[];
    // Registration specific
    gameType?: string;
    preferredDay?: string;
    timeSlot?: string;
    age?: number;
}

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const payload: EmailRequest = await req.json();
        const type = payload.type || 'card';

        let subject = "";
        let htmlContent = "";

        if (type === 'registration') {
            subject = `🎮 Registration Confirmed: ${payload.gameType}`;
            htmlContent = `
                <!DOCTYPE html>
                <html>
                <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0806;">
                  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="text-align: center; padding: 32px 20px; background: linear-gradient(135deg, #1a1510 0%, #2d241c 100%); border-radius: 16px 16px 0 0; border: 2px solid #D4AF37;">
                      <h1 style="color: #D4AF37; font-size: 30px; margin: 0 0 8px 0; font-weight: bold;">ArenaX Registration</h1>
                      <p style="color: #B8860B; margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Confirmed</p>
                    </div>
                    
                    <div style="background: #1a1510; border-left: 2px solid #D4AF37; border-right: 2px solid #D4AF37; padding: 24px;">
                      <p style="color: #f3f3f3; font-size: 16px;">Hi <strong style="color: #D4AF37;">${payload.name}</strong>,</p>
                      <p style="color: #d1d1d1; line-height: 1.6;">You have successfully registered for <strong>${payload.gameType}</strong>! Get ready for the challenge.</p>
                      
                      <div style="background: rgba(212, 175, 55, 0.1); border-radius: 8px; padding: 16px; margin-top: 20px;">
                        <table style="width: 100%; border-collapse: collapse;">
                          <tr>
                            <td style="padding: 8px 0; color: #B8860B; font-size: 12px; text-transform: uppercase;">Game</td>
                            <td style="padding: 8px 0; color: #f3f3f3; text-align: right;">${payload.gameType}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #B8860B; font-size: 12px; text-transform: uppercase;">Day</td>
                            <td style="padding: 8px 0; color: #f3f3f3; text-align: right;">${payload.preferredDay}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #B8860B; font-size: 12px; text-transform: uppercase;">Time Slot</td>
                            <td style="padding: 8px 0; color: #f3f3f3; text-align: right;">${payload.timeSlot || 'TBD'}</td>
                          </tr>
                        </table>
                      </div>
                    </div>

                     <div style="background: linear-gradient(135deg, #2d241c 0%, #1a1510 100%); border: 2px solid #D4AF37; border-radius: 0 0 16px 16px; padding: 24px; text-align: center;">
                       <p style="color: #666; font-size: 12px;">ArenaX Games • ${payload.flatNumber}</p>
                     </div>
                  </div>
                </body>
                </html>
            `;
        } else {
            // CARD Logic (Default)
            const cardCodes = payload.cardCodes || [];
            const participantNames = payload.participantNames || [];

            subject = `🎮 Your ArenaX Game Pass${cardCodes.length > 1 ? 'es' : ''} - Ready for Action!`;

            const cardsHtml = cardCodes.map((code, index) => `
              <div style="background: linear-gradient(135deg, #1a1510 0%, #2d241c 100%); border: 2px solid #D4AF37; border-radius: 16px; padding: 24px; margin-bottom: 20px; box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);">
                <div style="text-align: center; margin-bottom: 20px;">
                  <div style="display: inline-block; background: rgba(212, 175, 55, 0.1); border: 1px solid #D4AF37; border-radius: 12px; padding: 12px 24px;">
                    <p style="margin: 0; font-size: 12px; color: #B8860B; text-transform: uppercase; letter-spacing: 1px;">Card ${index + 1} of ${cardCodes.length}</p>
                  </div>
                </div>
                
                <div style="text-align: center; margin-bottom: 24px;">
                  <h2 style="color: #D4AF37; font-size: 28px; margin: 0 0 8px 0; font-weight: bold;">ArenaX Game Pass</h2>
                  <p style="color: #f3f3f3; font-size: 18px; margin: 0;">${participantNames[index] || payload.name}</p>
                </div>

                <div style="background: white; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(code)}" alt="QR Code" style="width: 200px; height: 200px; display: block; margin: 0 auto;" />
                </div>

                <div style="background: rgba(212, 175, 55, 0.1); border-left: 3px solid #D4AF37; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                  <p style="margin: 0 0 4px 0; font-size: 12px; color: #B8860B; text-transform: uppercase;">Card Code</p>
                  <p style="margin: 0; font-size: 20px; color: #D4AF37; font-weight: bold; font-family: monospace; letter-spacing: 2px;">${code}</p>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                  <div style="background: rgba(212, 175, 55, 0.05); padding: 12px; border-radius: 8px;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; color: #B8860B; text-transform: uppercase;">Flat Number</p>
                    <p style="margin: 0; font-size: 16px; color: #f3f3f3; font-weight: 600;">${payload.flatNumber}</p>
                  </div>
                  <div style="background: rgba(212, 175, 55, 0.05); padding: 12px; border-radius: 8px;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; color: #B8860B; text-transform: uppercase;">Phone</p>
                    <p style="margin: 0; font-size: 16px; color: #f3f3f3; font-weight: 600;">${payload.phone}</p>
                  </div>
                </div>

                <div style="background: rgba(212, 175, 55, 0.1); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 8px; padding: 12px; text-align: center;">
                  <p style="margin: 0; font-size: 12px; color: #D4AF37;">✨ Show this at the event entrance ✨</p>
                </div>
              </div>
            `).join('');

            htmlContent = `
                <!DOCTYPE html>
                <html>
                <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0806;">
                  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="text-align: center; padding: 32px 20px; background: linear-gradient(135deg, #1a1510 0%, #2d241c 100%); border-radius: 16px 16px 0 0; border: 2px solid #D4AF37; border-bottom: none;">
                      <h1 style="color: #D4AF37; font-size: 36px; margin: 0 0 8px 0; font-weight: bold;">Arena<span style="color: #f3f3f3;">X</span></h1>
                      <p style="color: #B8860B; margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Game Pass Confirmed</p>
                    </div>

                    <div style="background: #1a1510; border-left: 2px solid #D4AF37; border-right: 2px solid #D4AF37; padding: 24px;">
                      <p style="color: #f3f3f3; font-size: 16px; margin: 0 0 12px 0;">Hi <strong style="color: #D4AF37;">${payload.name}</strong>,</p>
                      <p style="color: #d1d1d1; font-size: 14px; line-height: 1.6;">Your ArenaX game pass${cardCodes.length > 1 ? 'es are' : ' is'} ready! 🎮</p>
                    </div>

                    <div style="background: #1a1510; border-left: 2px solid #D4AF37; border-right: 2px solid #D4AF37; padding: 0 24px 24px 24px;">
                      ${cardsHtml}
                    </div>

                    <div style="background: linear-gradient(135deg, #2d241c 0%, #1a1510 100%); border: 2px solid #D4AF37; border-top: none; border-radius: 0 0 16px 16px; padding: 24px;">
                      <p style="color: #666; font-size: 12px; text-align: center;">ArenaX Games • ${new Date().getFullYear()}</p>
                    </div>
                  </div>
                </body>
                </html>
            `;
        }

        const { data, error } = await resend.emails.send({
            from: "ArenaX Games <noreply@focsera.in>",
            to: [payload.email],
            subject: subject,
            html: htmlContent
        });

        if (error) throw error;

        return new Response(JSON.stringify({ success: true, data }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (error: any) {
        console.error("Function Error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
