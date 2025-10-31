// @ts-nocheck
// [EDIT] Updated imports to use deno.json
import { serve } from 'std/http/server.ts';
import { Resend } from 'resend';
import qrcode from 'qrcode';

console.log('Function cold start: index.ts loaded.');

// Helper function for email HTML
const createEmailHtml = (name: string, ticketId: string, qrDataUrl: string) => {
  // ... (HTML code is unchanged) ...
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

// [FIX] Added 'any' type to req for Deno
serve(async (req: any) => {
  console.log('Function invoked with a request.'); // <-- NEW LOG

  if (req.method !== 'POST') {
    console.warn('Request rejected: Not a POST method.');
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    console.log('Inside try block. Checking for API key...'); // <-- NEW LOG
    
    // 1. Get Resend API Key from Supabase Secrets
    // [FIX] This MUST be the NAME of the secret ('RESEND_API_KEY'), not the key itself.
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    
    if (!RESEND_API_KEY) {
      console.error('CRITICAL: RESEND_API_KEY is not set.');
      throw new Error('RESEND_API_KEY is not set in Supabase Secrets.');
    }
    console.log('RESEND_API_KEY found. Initializing Resend...'); // <-- NEW LOG
    const resend = new Resend(RESEND_API_KEY);

    // 2. Parse the new registration data from the webhook
    console.log('Parsing JSON from request body...'); // <-- NEW LOG
    const { record } = await req.json();
    console.log('JSON parsed. Record received with ID:', record?.id); // <-- NEW LOG

    // This is where the email is taken from the custom_contacts table record
    const { id, full_name, email } = record;

    if (!email) {
      console.warn('Record ' + id + ' has no email. Skipping email send.');
      return new Response('No email provided for this record.', { status: 400 });
    }
    console.log('Email ' + email + ' found. Generating ticket...'); // <-- NEW LOG

    // 3. Generate Unique Ticket ID
    const ticketId = `PROMPTX-${id.toString().padStart(6, '0')}`;
    console.log('Ticket ID ' + ticketId + ' generated.'); // <-- NEW LOG

    // 4. Generate QR Code
    console.log('Generating QR code...'); // <-- NEW LOG
    const qrCodeDataURL = await qrcode(ticketId, {
      size: 200,
      errorCorrection: 'H',
    });
    console.log('QR code generated.'); // <-- NEW LOG

    // 5. Create the Email
    const emailHtml = createEmailHtml(full_name, ticketId, qrCodeDataURL);
    console.log('HTML email created. Sending via Resend...'); // <-- NEW LOG

    // 6. Send the Email via Resend
    console.log('Calling resend.emails.send...');
    const sendResult = await resend.emails.send({
      from: 'PromptX <onboarding@resend.dev>', // IMPORTANT: Use onboarding@resend.dev OR your verified domain
      to: [email],
      subject: 'Your PromptX Workshop Ticket is Here! 🎟️',
      html: emailHtml,
      attachments: [
        {
          filename: `PromptX_Ticket_${ticketId}.png`,
          content: qrCodeDataURL.includes('base64,') ? qrCodeDataURL.split('base64,')[1] : qrCodeDataURL,
          encoding: 'base64',
        },
      ],
    });

    console.log('Resend sendResult:', JSON.stringify(sendResult));

    // Support different response shapes from the Resend SDK
    const possibleError = (sendResult as any)?.error || (sendResult as any)?.errors;
    if (possibleError) {
      console.error('Resend returned an error:', possibleError);
      throw new Error(JSON.stringify(possibleError));
    }

    const messageId = (sendResult as any)?.id || (sendResult as any)?.messageId || (sendResult as any)?.data?.id || null;
    console.log('Email sent successfully! Message ID:', messageId); // <-- NEW LOG

    // 7. Return a success response to the webhook
    return new Response(JSON.stringify({ success: true, messageId: data?.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  // [FIX] Kept your improved error handling
  } catch (err: unknown) { 
    const msg = (err as any)?.message || String(err);
    console.error('Function Error:', msg); // <-- THIS IS THE MOST IMPORTANT LOG
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

