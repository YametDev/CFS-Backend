const express = require('express')

const stripeRouter = express.Router()
const StripeController = require('../controllers/stripe')

stripeRouter.post('/create-checkout-session', StripeController.checkoutSession)
stripeRouter.post('/create-portal-session', StripeController.createPortalSession)
stripeRouter.post('/subscribe', StripeController.createCustomer)

module.exports = stripeRouter
