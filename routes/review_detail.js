const express = require('express')
const reviewRouter = express.Router()
const reviewController = require('../controllers/review_detail')

reviewRouter.get('/get', reviewController.getAll)
reviewRouter.post('/add', reviewController.addOne)

module.exports = reviewRouter
