const mongoose = require('mongoose')

const CompanySchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  customer: {
    type: String,
    require: true
  },
  dashboard: {
    type: String,
    require: true
  },
  managers: {
    type: Array
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
  }
}, { timestamps: true })

const Company = mongoose.model('companies', CompanySchema)

module.exports = Company
