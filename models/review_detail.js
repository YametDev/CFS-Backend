const mongoose = require('mongoose')

const DetailReviewSchema = mongoose.Schema({
  review_score: {
    type: JSON,
    require: true
  },
  review_text: {
    type: String,
    required: true
  }
}, { timestamps: true });

const DetailReview = mongoose.model('details', DetailReviewSchema)

module.exports = DetailReview
