/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose')

const SignupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    pass: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Signup = mongoose.model('users', SignupSchema)

module.exports = Signup
