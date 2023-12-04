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
module.exports = {
  eventAndMeetings,
}
