const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema({
  rating: {
    type: Number,
    require: true
  },
  review: {
    type: String,
    required: true,
  }
}, { timestamps: true })

const Review = mongoose.model('reviews', ReviewSchema)

module.exports = Review
