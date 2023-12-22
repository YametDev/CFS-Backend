const stripe = require('stripe')(
  'sk_test_51OApasEAnKVKf2tCplIbYkGKpFA5VGSmdtPTjTVquESmCRCkRKIohCJDopkPq3jwUKCzoVcF1QLzkK7Tb8SUw0ma00WOl6vkgh',
)

const YOUR_DOMAIN = 'http://localhost:3000/payments/'

module.exports.checkoutSession = async (req, res) => {
  const prices = await stripe.prices.list({
    lookup_keys: [req.body.lookup_key],
    expand: ['data.product'],
  })
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    line_items: [
      {
        price: prices.data[0].id,
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  })

  res.redirect(303, session.url)
}

module.exports.createPortalSession = async (req, res) => {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  const { sessionId } = req.body
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = YOUR_DOMAIN

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: returnUrl,
  })

  res.redirect(303, portalSession.url)
}

module.exports.createCustomer = async (req, res) => {
  const { stripeToken, email, productPlan } = req.body
  // create a customer
  try {
    console.log('------------------------>RECEIVED')
    const customer = await stripe.customers.create({
      email,
      source: stripeToken,
    })
    console.log('------------------------>CREATED', customer)
    // create a subscription for the newly created customer
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: productPlan,
          quantity: 1,
        },
      ],
    })
    console.log('------------------------>PROCESSING')
    res.send({ result: true, data: subscription })
  } catch (err) {
    res.send({ result: false, data: err })
  }
}
