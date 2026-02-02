import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import path from 'path';
import { fileURLToPath } from 'url';
import checkoutRouter from './routes/checkout.js';
import { sendConfirmationEmail } from './emailService.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ─── Stripe webhook (must be before express.json() middleware) ───
app.post(
  '/api/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const { customer_name, customer_email, customer_phone, graduation_year, ticket_quantity } =
        session.metadata;

      const quantity = parseInt(ticket_quantity, 10);
      const totalAmount = quantity * parseInt(process.env.TICKET_PRICE || '55', 10);

      console.log(`Payment completed: ${customer_name} — ${quantity} ticket(s) — $${totalAmount}`);

      // Send confirmation email
      try {
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

    res.json({ received: true });
  }
);

// ─── Standard middleware (after webhook route) ───
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());

// ─── API routes ───
app.use('/api', checkoutRouter);

// ─── Serve React build in production ───
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
