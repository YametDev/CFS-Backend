const jwt = require('jsonwebtoken')

module.exports.validateDateFormat = (dateString, regex) => {
  return regex.test(dateString)
}
