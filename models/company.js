const mongoose = require('mongoose')

const CompanySchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    display: {
      type: String,
    },
    customer: {
      type: String,
    },
    dashboard: {
      type: String,
    },
    managers: {
      type: Array,
    },
    google: {
      type: String,
    },
    star: {
      type: String,
    },
    button: {
      type: String,
    },
    logo: {
      type: String,
    },
    street: {
      type: String,
    },
    alertEmail: {
      type: Boolean,
      default: false,
      require: true,
    },
    alertSMS: {
      type: Boolean,
      default: false,
      require: true,
    },
  },
  { timestamps: true },
)

const Company = mongoose.model('companies', CompanySchema)

module.exports = Company
