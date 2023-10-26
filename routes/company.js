const express = require('express')
const reviewRouter = express.Router()
const reviewController = require('../controllers/company')

reviewRouter.post('/exists', reviewController.exists)

module.exports = reviewRouter
