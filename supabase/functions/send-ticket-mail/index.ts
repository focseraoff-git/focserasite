// [EDIT] Updated imports to use deno.json
// @ts-nocheck
import { serve } from 'std/http/server.ts';
import { Resend } from 'resend';
import qrcode from 'qrcode';

// Helper function for email HTML
const createEmailHtml = (name: string, ticketId: string, qrDataUrl: string) => {
  return `
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your PromptX Ticket</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; }
        .container { width: 90%; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 12px; overflow: hidden; }
        .header { background: #0f172a; padding: 40px; text-align: center; }
        .header h1 { color: #fff; font-size: 36px; margin: 0; filter: drop-shadow(0 0 8px rgba(96, 165, 250, 0.7)); }
        .content { padding: 30px; }
        .content p { font-size: 16px; color: #333; }
        .ticket { background: #f4f4f7; border-radius: 8px; padding: 20px; text-align: center; }
        .ticket-id { font-size: 24px; font-weight: bold; color: #0f172a; margin-bottom: 15px; }
        .qr-code { margin-top: 20px; }
        .footer { padding: 30px; text-align: center; font-size: 12px; color: #777; background: #f9fafb; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>PromptX</h1>
        </div>
        <div class="content">
          <p>Hello ${name},</p>
          <p>Thank you for registering for the <strong>PromptX AI Workshop</strong>! We are excited to have you join us. This email contains your unique ticket ID and QR code for entry.</p>
          
          <div class="ticket">
            <p style="margin:0; color: #555;">Your Unique Ticket ID is:</p>
            <div class="ticket-id">${ticketId}</div>
            <p style="margin:0; color: #555;">Please present this QR code at the event entry:</p>
            <div class="qr-code">
              <img src="${qrDataUrl}" alt="Your Ticket QR Code" width="200" height="200">
            </div>
          </div>
          
          <p style="margin-top: 20px;">We look forward to seeing you there!</p>
          <p>— The Focsera Events Team</p>
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} PromptX. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;
};

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    // 1. Get Resend API Key from Supabase Secrets
    const RESEND_API_KEY = Deno.env.get('49999f7ce02c0beae495019393fefdd14e3b60c5f79b080b5cb9e6cb99a4d15f');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set in Supabase Secrets.');
    }
    const resend = new Resend(RESEND_API_KEY);

    // 2. Parse the new registration data from the webhook
    const { record } = await req.json();
    const { id, full_name, email } = record;

    if (!email) {
      return new Response('No email provided for this record.', { status: 400 });
    }

    // 3. Generate Unique Ticket ID
    // We use the database row 'id' to ensure it's unique
    const ticketId = `PROMPTX-${id.toString().padStart(6, '0')}`;

    // 4. Generate QR Code
    // This creates a base64 Data URL (e.g., "data:image/png;base64,...")
    const qrCodeDataURL = await qrcode(ticketId, {
      size: 200,
      errorCorrection: 'H',
    });

    // 5. Create the Email
    const emailHtml = createEmailHtml(full_name, ticketId, qrCodeDataURL);

    // 6. Send the Email via Resend
    const { data, error } = await resend.emails.send({
      from: 'PromptX <onboarding@resend.dev>', // IMPORTANT: Use onboarding@resend.dev OR your verified domain
      to: [email],
      subject: 'Your PromptX Workshop Ticket is Here! 🎟️',
      html: emailHtml,
      attachments: [
        {
          filename: `PromptX_Ticket_${ticketId}.png`,
          // Get only the base64 part of the Data URL
          content: qrCodeDataURL.split('base64,')[1],
          encoding: 'base64', // Specify encoding as base64
        },
      ],
    });

    if (error) {
      console.error('Resend Error:', error);
      throw new Error(error.message);
    }

    // 7. Return a success response to the webhook
    return new Response(JSON.stringify({ success: true, messageId: data?.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Function Error:', err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

