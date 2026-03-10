import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // CORS for browser preflight
  res.setHeader('Access-Control-Allow-Origin', 'https://daltonsai.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { priceId, planName } = req.body || {};
  if (!priceId) {
    return res.status(400).json({ error: 'Missing priceId' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `https://daltonsai.com?payment=success&plan=${encodeURIComponent(planName || 'your plan')}`,
      cancel_url:  `https://daltonsai.com?payment=cancelled`,
      locale: 'nl',
      billing_address_collection: 'required',
      payment_method_types: ['card', 'ideal', 'bancontact'],
      metadata: { plan: planName || '' },
      subscription_data: { metadata: { plan: planName || '' } },
    });
    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
