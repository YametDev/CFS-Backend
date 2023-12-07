const nodemailer = require('nodemailer')
const twilio = require('twilio')
const Review = require('../models/review')
const Company = require('../models/company')
const template = require('../template')
require('dotenv').config()

const transporter = nodemailer.createTransport()
// const transporter = nodemailer.createTransport(
//   'smtps://user%40gmail.com:pass@smtp.gmail.com',
// )

const mailOptions = {
  from: '"no-reply" <notification@leavefeedback.org>',
  sender: '"no-reply" <no-reply@leavefeedback.org>',
  to: 'heliyamet3190@gmail.com',
}

module.exports.sendEmail = async (reviewID) => {
  const data = await Review.findById(reviewID)
  const company = await Company.findOne({ name: data.company })

  company.managers.forEach((val) => {
    if (val.email) {
      console.log('Sending Email To ', val.email)
      transporter.sendMail(
        {
          ...mailOptions,
          html: template.templateEmail(data),
          to: val.email,
          subject: `Feedback for ${data.company}`,
        },
        (error) => {
          if (error)
            console.log('Error occurred while sending email:', error.message)
        },
      )
    }
  })
}

module.exports.sendSMS = async (reviewID) => {
  const data = await Review.findById(reviewID)
  const company = await Company.findOne({ name: data.company })
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const twilioNumber = process.env.TWILIO_PHONE_NUMBER

  company.managers.forEach((val) => {
    if (val.phone) {
      console.log('Sending SMS To ', val.phone)
      const client = twilio(accountSid, authToken)
      client.messages.create(
        {
          from: twilioNumber,
          to: val.phone,
          body: template.templateSMS(data),
        },
        (error) => {
          if (error)
            console.log('Error occured while sending SMS:', error.message)
        },
      )
    }
  })
}

module.exports.addOne = async (req, res) => {
  try {
    const newReview = new Review(req.body)
    const company = await Company.findOne({ name: newReview.company })
    newReview
      .save()
      .then((savedRecord) => {
        console.log(
          'Email Alert : ',
          company.alertEmail,
          '\nSMS Alert : ',
          company.alertSMS,
        )
        if (company.alertSMS) {
          setTimeout(this.sendSMS, 300000, savedRecord._id)
        }
        if (company.alertEmail) {
          setTimeout(this.sendEmail, 30000, savedRecord._id)
        }
        res.send({ result: true, data: savedRecord._id })
      })
      .catch((error) => {
        throw error
      })
  } catch (err) {
    console.error(err)
    res.send({ result: false })
  }
}

module.exports.modify = async (req, res) => {
  try {
    const updateFields = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    }
    Review.findOneAndUpdate({ _id: req.body.id }, updateFields, { new: true })
      .then((updatedUser) => {
        res.send({ result: true })
      })
      .catch((error) => {
        console.log(error)
        res.send({ result: false })
      })
  } catch (err) {
    console.error(err)
    res.send({ result: false })
  }
}

module.exports.getAllData = async () => {
  try {
    const data = await Review.find({})
    return data
  } catch (err) {
    console.log(err)
    return null
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const data = await Review.find({ company: req.body.company })
    const cal = [0, 0, 0, 0, 0]

    data.forEach((val) => {
      cal[val.rating - 1]++
    })
    const result = cal.map((val, ind) => ({
      level: `${ind + 1} Star`,
      percentage: (val * 100) / data.length,
    }))

    res.send({ result: true, data: result })
  } catch (err) {
    console.error(err)
    res.send({ result: false })
  }
}

module.exports.getRecent = async (req, res) => {
  try {
    const data = await Review.find({ company: req.body.company })
    res.send({ result: true, data: data.slice(0, req.body.count) })
  } catch (err) {
    console.error(err)
    res.send({ result: false })
  }
}

module.exports.getDetail = async (req, res) => {
  try {
    const data = await Review.find({ company: req.body.company })

    const keyArr = {
      wait: 0,
      friendliness: 1,
      cleanliness: 2,
      price: 3,
      quality: 4,
    }

    const result = [
      {
        data: [0, 0, 0, 0, 0],
        label: '🙁',
        stack: 'total',
        color: '#ba000d',
      },
      {
        data: [0, 0, 0, 0, 0],
        label: '😐',
        stack: 'total',
        color: '#ffea00',
      },
      {
        data: [0, 0, 0, 0, 0],
        label: '🙂',
        stack: 'total',
        color: '#06ff00',
      },
    ]

    data.forEach((element) => {
      for (key in element.review_score) {
        if (element.review_score.hasOwnProperty(key)) {
          if (element.review_score[key])
            result[element.review_score[key] - 1].data[keyArr[key]]++
        }
      }
    })

    result[0].data.forEach((element, index) => {
      const sum =
        result[0].data[index] + result[1].data[index] + result[2].data[index]
      result[0].data[index] = (result[0].data[index] * 100) / sum
      result[1].data[index] = (result[1].data[index] * 100) / sum
      result[2].data[index] = (result[2].data[index] * 100) / sum
    })

    res.send({ result: true, data: result })
  } catch (err) {
    console.error(err)
    res.send({ result: false })
  }
}
