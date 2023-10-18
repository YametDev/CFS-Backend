const express = require('express')
const reviewRouter = express.Router()
const reviewController = require('../controllers/review')

reviewRouter.get('/get', reviewController.getAll)
reviewRouter.post('/add', reviewController.addOne)
reviewRouter.get('/recent', reviewController.getRecent)

module.exports = reviewRouter
