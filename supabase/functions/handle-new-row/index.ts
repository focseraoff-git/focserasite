// No import for 'serve' is needed! It's now built-in.

const RESEND_API_URL = 'https://api.resend.com/emails';

// --- Email Template Function ---
function formatNewRequirementEmail(record: any, table: string) {
  
  let customerName = 'there'; // Default name

  // --- NEW: Smarter Name Finder ---
  // 1. First, check inside the 'client_details' jsonb
  if (record.client_details && typeof record.client_details === 'object' && record.client_details.name) {
    customerName = record.client_details.name;
  } else {
    // 2. Fallback: Check top-level columns (for other tables)
    const possibleNameKeys = ['name', 'full_name', 'contact_name', 'contact name'];
    for (const key of possibleNameKeys) {
      if (record[key] && typeof record[key] === 'string') {
        customerName = record[key];
        break; 
      }
    }
  }
  // --- End of new logic ---

  const serviceType = table.split('_')[0]; 
  const serviceName = serviceType.charAt(0).toUpperCase() + serviceType.slice(1);

  return {
    subject: `We've Received Your ${serviceName} Request!`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333; max-width: 600px; margin: 20px auto; padding: 30px; border: 1px solid #ddd; border-radius: 8px;">
        
        <img 
          src="https://gyjedezyhdlpwzeyixwg.supabase.co/storage/v1/object/public/assets/FocseraLogo.jpg" 
          alt="Focsera Logo" 
          style="width: 150px; max-width: 90%; margin-bottom: 25px; display: block; margin-left: auto; margin-right: auto;"
        >
        
        <h2 style="color: #1a1a1a; margin-top: 0; text-align: center;">We've Received Your ${serviceName} Request!</h2>
        
        <p>Hi ${customerName},</p>
        
        <p>Welcome to Focsera! We've successfully received your requirement for our <strong>${serviceType} services</strong>.</p>
        
        <p>Our team is now personally reviewing your request and curating the best possible price and service package for you.</p>
        
        <p>We will be in touch with your custom quote as soon as possible.</p>
        
        <p style="margin-top: 30px;">Best,<br>The Focsera Team</p>
        
        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
        
        <p style="font-size: 12px; color: #888; text-align: center;">
          © 2025 Focsera<br>
          <a href="https://www.focsera.in" style="color: #007bff; text-decoration: none;">focsera.in</a>
        </p>
      
      </div>
    `,
  };
}

// --- Main Edge Function ---
Deno.serve(async (req) => {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  if (!resendApiKey) {
    console.error('RESEND_API_KEY is not set');
    return new Response(JSON.stringify({ error: 'RESEND_API_KEY is not set' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const { table, record } = await req.json();

    if (!table || !record) {
      return new Response(JSON.stringify({ error: 'Invalid payload. "table" and "record" are required.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    let emailContent: { subject: string; html: string; } | undefined;
    let recipientEmail: string | undefined;
    
    // This switch handles all 6 of your tables
    switch (table) {
      case 'event_bookings':
      case 'event_quotes':
      case 'media_bookings':
      case 'media_quotes':
      case 'studio_bookings':
      case 'studio_quotes':
        
        // --- NEW: Smarter Email Finder ---
        // 1. First, check inside the 'client_details' jsonb
        if (record.client_details && typeof record.client_details === 'object' && record.client_details.email) {
          recipientEmail = record.client_details.email;
        } else {
          // 2. Fallback: Check top-level columns (for other tables)
          const possibleEmailKeys = ['email', 'contact_mail', 'contact', 'contact mail', 'contact_email'];
          for (const key of possibleEmailKeys) {
            if (record[key] && typeof record[key] === 'string') {
              recipientEmail = record[key];
              break; 
            }
          }
        }
        // --- End of new logic ---
        
        if (recipientEmail) {
          emailContent = formatNewRequirementEmail(record, table);
        }
        break;

      default:
        console.warn(`No email handler for new row in table: ${table}`);
        return new Response(JSON.stringify({ message: 'No handler for this table' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // Centralized Error Check
    if (!recipientEmail || !emailContent) {
       console.error(`No valid email column found in record from table '${table}'. Looked in 'client_details.email' and top-level columns.`);
       return new Response(JSON.stringify({ error: `No valid email column found for record in ${table}` }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Construct the Resend payload
    const emailPayload = {
      from: 'Focsera <bookings@focsera.in>', // Your verified domain
      to: [recipientEmail],
      subject: emailContent.subject,
      html: emailContent.html,
    };

    // Send the email
    const res = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${resendApiKey}` },
      body: JSON.stringify(emailPayload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Resend API error:', errorData);
      return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error('Function error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
});