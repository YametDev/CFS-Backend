const Signup = require('../models/signup')

module.exports.login = async (req, res) => {
  const { name, email, pass } = req.body
  Signup.findOne({ name, email }, (err, val) => {
    if (err) {
      res.send({ result: false, data: err })
    } else if (!val) {
      res.send({ result: false, data: 'No user found' })
    } else if (pass === val.pass) {
      res.send({ result: true, data: val })
    } else {
      res.send({ result: false, data: 'Wrong Password' })
    }
  })
}

module.exports.exists = async (req, res) => {
  Signup.findOne({ name: req.body.company }, (err, val) => {
    if (err) {
      res.send({ result: false })
    } else {
      res.send({ result: !!val })
    }
  })
}

module.exports.signup = async (req, res) => {
  const { name, email, pass } = req.body
  Signup.findOne({ name }, (err, val) => {
    if (err) {
      res.send({ result: false, data: err })
    } else if (val) {
      res.send({ result: false, data: 'Try another company !' })
    } else {
      const newSignup = new Signup(req.body)
      newSignup
        .save()
        .then((record) => {
          res.send({ result: true, data: record.name })
        })
        .catch((error) => {
          console.log(error)
          res.send({ result: false, data: error })
        })
    }
  })
}
