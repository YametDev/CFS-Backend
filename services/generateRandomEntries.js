const bcrypt = require('bcryptjs')
const { ACTIVITY, ROLE, LOCATION, BRANCHES } = require('../constants/constant')
const Signup = require('../models/signup')

const branches = [
  'Parul University',
  'Vadodara Startup Studio',
  'Ahmedabad Startup Studio',
  'Rajkot Startup Studio',
  'Surat Startup Studio',
];

function generateRandomString(minLength, maxLength) {
  const length =
    minLength + Math.floor(Math.random() * (maxLength - minLength + 1))
  let result = ''

  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

function generateRandomNumberString(length) {
  let result = ''

  const digits = '0123456789'

  for (let i = 0; i < length; i++) {
    result += digits.charAt(Math.floor(Math.random() * digits.length))
  }

  return result
}

function generateRandomRole() {
  const roles = ['admin', 'student']
  return roles[Math.floor(Math.random() * roles.length)]
}
function generateRandomScheduleType() {
  const types = ['event', 'meeting']
  return types[Math.floor(Math.random() * types.length)]
}

function randomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function generateRandomBranch() {
  const res = []
  for (let i = 0; i < randomNumberInRange(2, 5); i++) {
    res.push(branches[randomNumberInRange(0, 4)])
  }
  return res
}
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  )
}

function generateRandomNumber(length) {
  const min = 10 ** (length - 1)
  const max = 10 ** length - 1
  return Math.floor(Math.random() * (max - min + 1) + min)
}
module.exports = {
  eventAndMeetings,
}
