import { Router } from 'express';
import Stripe from 'stripe';

const router = Router();

router.post('/create-checkout-session', async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not set in .env');
    return res.status(500).json({ error: 'Payment service is not configured. Set STRIPE_SECRET_KEY in .env.' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { fullName, email, phone, quantity, gradYear } = req.body;

  // Validate required fields
  if (!fullName || !email || !phone || !quantity) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const ticketQuantity = parseInt(quantity, 10);
  if (ticketQuantity < 1 || ticketQuantity > 10) {
    return res.status(400).json({ error: 'Invalid ticket quantity.' });
  }

  const ticketPrice = parseInt(process.env.TICKET_PRICE || '55', 10);
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Feinstein High School Reunion 2026 Ticket',
              description: 'General Admission — Saturday, May 23, 2026 at 7:00 PM',
            },
            unit_amount: ticketPrice * 100, // Convert dollars to cents
          },
          quantity: ticketQuantity,
        },
      ],
      mode: 'payment',
      success_url: `${clientUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/purchase`,
      metadata: {
        customer_name: fullName,
        customer_email: email,
        customer_phone: phone,
        graduation_year: gradYear || 'Not specified',
        ticket_quantity: String(ticketQuantity),
      },
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error('Error creating checkout session:', err.message);
    return res.status(500).json({ error: 'Failed to create checkout session.' });
  }
});

// Verify a completed checkout session and trigger confirmation email
const emailSentSessions = new Set();

router.get('/verify-session', async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Payment service is not configured.' });
  }

  const { session_id } = req.query;
  if (!session_id) {
    return res.status(400).json({ error: 'Missing session_id.' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed.' });
    }

    const { customer_name, customer_email, customer_phone, graduation_year, ticket_quantity } =
      session.metadata;
    const quantity = parseInt(ticket_quantity, 10);
    const ticketPrice = parseInt(process.env.TICKET_PRICE || '55', 10);
    const totalAmount = quantity * ticketPrice;

    // Send confirmation email only once per session
    if (!emailSentSessions.has(session_id)) {
      emailSentSessions.add(session_id);
      try {
        const { sendConfirmationEmail } = await import('../emailService.js');
        await sendConfirmationEmail({
          fullName: customer_name,
          email: customer_email,
          phone: customer_phone,
          gradYear: graduation_year,
          quantity,
          totalAmount,
          confirmationId: session.payment_intent,
        });
      } catch (emailErr) {
        console.error('Failed to send confirmation email:', emailErr.message);
      }
    }

    return res.json({
      fullName: customer_name,
      email: customer_email,
      quantity,
      totalPrice: totalAmount,
      confirmationId: session.payment_intent,
    });
  } catch (err) {
    console.error('Error verifying session:', err.message);
    return res.status(500).json({ error: 'Failed to verify session.' });
  }
});

export default router;
