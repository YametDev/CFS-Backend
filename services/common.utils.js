const jwt = require('jsonwebtoken')

module.exports.validateRequest = (request, params) => {
  let isInvalidRequest = Object.keys(request).some(
    (key) => !Object.keys(params).includes(key),
  )
  if (isInvalidRequest) return isInvalidRequest

  const invalidArray = [null, undefined, 'null', 'undefined', '']
  for (const key in params) {
    if (params[key] && invalidArray.includes(request[key])) {
      isInvalidRequest = true
      break
    }
  }
  return isInvalidRequest
}

module.exports.validateDateFormat = (dateString, regex) => {
  return regex.test(dateString)
}
