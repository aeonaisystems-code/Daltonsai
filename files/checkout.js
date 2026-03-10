const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://daltonsai.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { priceId, planName, customerEmail } = req.body;

    if (!priceId) {
      return res.status(400).json({ error: 'Price ID is required' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'ideal', 'bancontact'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      subscription_data: {
        metadata: {
          plan: planName || 'unknown',
          platform: 'Daltons AI',
        },
      },
      customer_email: customerEmail || undefined,
      success_url: 'https://daltonsai.com?payment=success&plan=' + encodeURIComponent(planName || ''),
      cancel_url: 'https://daltonsai.com?payment=cancelled',
      locale: 'nl',
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
      custom_text: {
        submit: {
          message: 'Je abonnement start direct na betaling. Welkom bij Daltons AI!'
        }
      },
      metadata: {
        company: 'Daltons AI B.V.',
        kvk: '97688835',
        plan: planName || 'unknown',
      },
    });

    return res.status(200).json({ url: session.url });

  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({ error: error.message });
  }
};
