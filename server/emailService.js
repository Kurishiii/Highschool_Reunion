import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendConfirmationEmail({
  fullName,
  email,
  quantity,
  totalAmount,
  confirmationId,
}) {
  const fromName = process.env.EMAIL_FROM_NAME || 'Feinstein High School Reunion';
  const fromAddr = process.env.EMAIL_FROM || process.env.EMAIL_USER;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.07);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#042f2e 0%,#0f766e 100%);padding:40px 40px 30px;text-align:center;">
              <h1 style="color:#ffffff;font-size:28px;margin:0 0 8px;">Feinstein High School</h1>
              <p style="color:#5eead4;font-size:18px;margin:0 0 4px;font-style:italic;">Reunion 2026</p>
              <p style="color:#99f6e4;font-size:13px;margin:0;letter-spacing:2px;text-transform:uppercase;">Celebrating Decades of Memories</p>
            </td>
          </tr>

          <!-- Confirmation banner -->
          <tr>
            <td style="background-color:#14b8a6;padding:20px 40px;text-align:center;">
              <p style="color:#ffffff;font-size:14px;margin:0;text-transform:uppercase;letter-spacing:1px;">Purchase Confirmed</p>
              <p style="color:#ffffff;font-size:13px;margin:6px 0 0;opacity:0.9;">Confirmation: <strong>${confirmationId}</strong></p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="color:#111827;font-size:16px;margin:0 0 20px;">Hi <strong>${fullName}</strong>,</p>
              <p style="color:#4b5563;font-size:15px;line-height:1.6;margin:0 0 30px;">
                Thank you for purchasing tickets to the Feinstein High School Reunion 2026! We're thrilled you'll be joining us for an unforgettable evening.
              </p>

              <!-- Order Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;border-radius:12px;margin-bottom:30px;">
                <tr>
                  <td style="padding:24px;">
                    <p style="color:#111827;font-size:16px;font-weight:600;margin:0 0 16px;">Order Details</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#6b7280;font-size:14px;padding:6px 0;">Tickets</td>
                        <td style="color:#111827;font-size:14px;padding:6px 0;text-align:right;font-weight:600;">${quantity}</td>
                      </tr>
                      <tr>
                        <td style="color:#6b7280;font-size:14px;padding:6px 0;">Price per ticket</td>
                        <td style="color:#111827;font-size:14px;padding:6px 0;text-align:right;">$${process.env.TICKET_PRICE || '55'}.00</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="border-top:1px solid #e5e7eb;padding-top:12px;margin-top:6px;">
                          <table width="100%">
                            <tr>
                              <td style="color:#111827;font-size:16px;font-weight:700;">Total Paid</td>
                              <td style="color:#0d9488;font-size:18px;font-weight:700;text-align:right;">$${totalAmount}.00</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Event Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:2px dashed #e5e7eb;border-radius:12px;margin-bottom:30px;">
                <tr>
                  <td style="padding:24px;">
                    <p style="color:#111827;font-size:16px;font-weight:600;margin:0 0 16px;">Event Details</p>
                    <p style="color:#4b5563;font-size:14px;line-height:1.8;margin:0;">
                      <strong>Feinstein High School Reunion 2026</strong><br>
                      ${process.env.EVENT_DATE || 'May 23, 2026'} at ${process.env.EVENT_TIME || '7:00 PM'}<br>
                      ${process.env.EVENT_LOCATION || 'Bar 101, 1478 Atwood Ave, Johnston, RI 02919'}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- What's Included -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0fdfa;border-radius:12px;margin-bottom:30px;">
                <tr>
                  <td style="padding:24px;">
                    <p style="color:#0f766e;font-size:16px;font-weight:600;margin:0 0 12px;">What's Included</p>
                    <p style="color:#115e59;font-size:14px;line-height:1.6;margin:0;">
                      &#10003; Full appetizer bar experience<br>
                      <span style="color:#6b7280;font-size:13px;">Note: Beverages available for purchase at cash bar</span>
                    </p>
                  </td>
                </tr>
              </table>

              <p style="color:#4b5563;font-size:14px;line-height:1.6;margin:0 0 10px;">
                We look forward to seeing you there! If you have any questions, don't hesitate to reach out.
              </p>
              <p style="color:#4b5563;font-size:14px;margin:0;">
                Go Falcons!
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#111827;padding:30px 40px;text-align:center;">
              <p style="color:#9ca3af;font-size:13px;margin:0 0 8px;">Feinstein High School Reunion Committee</p>
              <p style="color:#6b7280;font-size:12px;margin:0 0 4px;">
                <a href="mailto:${fromAddr}" style="color:#14b8a6;text-decoration:none;">${fromAddr}</a>
              </p>
              <p style="color:#4b5563;font-size:11px;margin:12px 0 0;">&copy; 2026 Feinstein High School Reunion. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  await transporter.sendMail({
    from: `"${fromName}" <${fromAddr}>`,
    to: email,
    subject: `Ticket Confirmation — Feinstein High School Reunion 2026 (${confirmationId})`,
    html,
  });

  console.log(`Confirmation email sent to ${email}`);
}
