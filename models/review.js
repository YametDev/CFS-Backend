const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema({
  rating: {
    type: Number,
    require: true
  },
  review: {
    type: String,
  },
  review_score: {
    type: JSON,
    require: true
  },
  review_text: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  company: {
    type: String,
  }
}, { timestamps: true })

const Review = mongoose.model('reviews', ReviewSchema)

module.exports = Review
