const express = require('express')

const reviewRouter = express.Router()
const reviewController = require('../controllers/review')

reviewRouter.post('/add', reviewController.addOne)
reviewRouter.post('/modify', reviewController.modify)
reviewRouter.post('/normal', reviewController.getAll)
reviewRouter.post('/detail', reviewController.getDetail)
reviewRouter.post('/recent', reviewController.getRecent)

module.exports = reviewRouter
