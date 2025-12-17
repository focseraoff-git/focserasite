import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import qrcode from "https://esm.sh/qrcode@1.5.3";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Base64 } from "https://esm.sh/js-base64@3.7.5";

console.log("Function cold start: index.ts loaded.");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface WebhookPayload {
  record: {
    id: number;
    full_name: string;
    email: string;
  };
}

const createEmailHtml = (
  name: string,
  ticketId: string,
  qrCodeCid: string,
) => {
  const eventDate = "November 15, 2025";
  const eventTime = "10:00 AM - 4:00 PM IST";

  return `
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your PromptX Ticket</title>
    <style>
      body { font-family: sans-serif; line-height: 1.6; background-color: #f9fafb; margin: 0; padding: 0; }
      .container { width: 90%; max-width: 500px; margin: 20px auto; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e5e7eb; }
      .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 40px 30px; text-align: center; }
      .header h1 { color: #ffffff; font-size: 40px; font-weight: 800; margin: 0; }
      .content { padding: 35px 30px; background-color: #ffffff; }
      .ticket-pass { background-color: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb; text-align: center; padding: 25px; }
      .qr-code { margin: 10px auto; padding: 10px; background: #fff; border-radius: 8px; display: inline-block; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
      .ticket-id { font-size: 26px; font-weight: 700; color: #111827; margin-top: 15px; letter-spacing: 1px; }
      .footer { padding: 30px; text-align: center; font-size: 12px; color: #6b7280; background-color: #f9fafb; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header"><h1>PromptX</h1></div>
      <div class="content">
        <p>Hello ${name},</p>
        <p>You're all set! Thank you for registering for the <strong>PromptX AI Workshop</strong>.</p>
        <div class="ticket-pass">
          <p>Present this QR code for entry:</p>
          <div class="qr-code"><img src="cid:${qrCodeCid}" alt="Ticket QR" width="220" height="220"></div>
          <div class="ticket-id">${ticketId}</div>
          <div style="text-align:left; margin-top:25px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Date:</strong> ${eventDate}</p>
            <p><strong>Time:</strong> ${eventTime}</p>
          </div>
        </div>
      </div>
      <div class="footer">© ${new Date().getFullYear()} PromptX. All rights reserved.</div>
    </div>
  </body>
  </html>
  `;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set");
    
    const resend = new Resend(RESEND_API_KEY);
    const { record }: WebhookPayload = await req.json();
    const { id, full_name, email } = record;

    if (!email) return new Response("No email provided", { status: 400, headers: corsHeaders });

    // Generate Ticket ID
    const seed = `${full_name}${email}${Math.random().toString(36).substring(2, 8)}${Date.now()}`;
    const enc = new TextEncoder();
    const hash = await crypto.subtle.digest('SHA-256', enc.encode(seed));
    const hex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    const ticketId = `PROMPTX-${hex.substring(0, 8).toUpperCase()}`;

    // Generate QR
    const qrDetails = JSON.stringify({ id, fullName: full_name, email, ticketId });
    const qrCodeDataURL = await qrcode.toDataURL(qrDetails, { size: 220, errorCorrection: "H" });
    const qrCodeContentId = `qrcode_${ticketId}`;

    // Email
    const emailHtml = createEmailHtml(full_name, ticketId, qrCodeContentId);
    const htmlBase64 = Base64.encode(emailHtml);

    const sendResult = await resend.emails.send({
      from: "PromptX <hello@focsera.in>",
      to: [email],
      subject: "Your PromptX Workshop Ticket is Here! 🎟️",
      html: emailHtml,
      attachments: [
        {
          filename: `PromptX_Ticket_QR_Inline.png`,
          content: qrCodeDataURL.split("base64,")[1],
          encoding: "base64",
          contentType: "image/png",
          contentId: qrCodeContentId,
        },
        {
          filename: `PromptX_Ticket_${ticketId}.html`,
          content: htmlBase64,
          encoding: "base64",
          contentType: "text/html",
        },
      ],
    });

    if (sendResult.error) throw new Error(JSON.stringify(sendResult.error));

    // Update DB
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    await supabaseAdmin.from('custom_contacts').update({ ticket_id: ticketId }).eq('id', id);

    return new Response(JSON.stringify({ success: true, messageId: sendResult.data?.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

