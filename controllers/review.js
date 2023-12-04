const nodemailer = require('nodemailer');
const Review = require('../models/review')
const Company = require('../models/company');
const template = require('./../template');
const twilio = require('twilio');
require('dotenv').config();

let transporter = nodemailer.createTransport({
  // service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'heliyamet3190@gmail.com',
    pass: 'wcxy rofe cmfh naqx'
  }
});

let mailOptions = {
  from: 'notification@leavefeedback.org',
  to: 'heliyamet3190@gmail.com',
  subject: 'New Review',
};

module.exports.sendEmail = async reviewID => {
  const data = await Review.findById(reviewID);
  const company = await Company.findOne({name: data.company});

  company.managers.forEach( val => {
    if(val.email){
      console.log("Sending Email To ", val.email);
      transporter.sendMail(
        {
          ...mailOptions,
          html: template.templateEmail(data),
          to: val.email,
        },
        (error, info) => {
          if (error) {
            console.log('Error occurred while sending email:', error.message);
          } else { console.log('Email sent successfully!\n', info); }
        }
      );
    }
  })
}

module.exports.sendSMS = async reviewID => {
  const data = await Review.findById(reviewID);
  const company = await Company.findOne({name: data.company});
  const accountSid = process.env.TWILIO_ACCOUNT_SID; 
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

  company.managers.forEach( val => {
    if(val.phone) {
      console.log("Sending SMS To", val.phone);
      const client = twilio(accountSid, authToken);
      client.messages.create({
        from: twilioNumber,
        to: "+12602553354",
        body: template.templateSMS(data)
      }).then((message) => console.log(message.sid)).catch(err => console.log(err));
    }
  })
}

module.exports.addOne = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    newReview.save()
    .then(savedRecord => {
      setTimeout(this.sendSMS, 5000, savedRecord._id);
      res.send({ result: true, data: savedRecord._id });
    })
    .catch(error => {
      throw error;
    })
  } catch (err) {
    console.error(err);
    res.send({ result: false });
  }
}

module.exports.modify = async (req, res) => {
  try {
    const updateFields = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };
    Review.findOneAndUpdate({_id: req.body.id}, updateFields, { new: true })
      .then(updatedUser => {
        res.send({ result: true });
      })
      .catch(error => {
        console.log(error);
        res.send({ result: false });
      });
  } catch (err) {
    console.error(err);
    res.send({ result: false });
  }
}
module.exports.getAllData = async() => {
  try {
    const data = await Review.find({});
    return data;
  } catch (err) {
    console.log(err);
  }
}
module.exports.getAll = async (req, res) => {
  try {
    const data = await Review.find({company: req.body.company})
    const cal = [0, 0, 0, 0, 0];

    data.forEach( val => { cal[val.rating - 1] ++; });
    const result = cal.map( (val, ind) => ({
      level: ( ind + 1 ) + " Star",
      percentage: ( val * 100 ) / data.length
    }));

    res.send({ result: true, data: result });
  } catch (err) {
    console.error(err);
    res.send({ result: false });
  }
}

module.exports.getRecent = async (req, res) => {
  try {
    const data = await Review.find({company: req.body.company});
    res.send({ result: true, data: data.slice(0, req.body.count) });
  } catch (err) {
    console.error(err);
    res.send({ result: false });
  }
}

module.exports.getDetail = async (req, res) => {
  try {
    const data = await Review.find({company: req.body.company});

    const keyArr = {
      wait: 0,
      friendliness: 1,
      cleanliness: 2,
      price: 3,
      quality: 4
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
        color: '#06ff00'
      }
    ]
    
    data.forEach(element => {
      for(key in element.review_score) {
        if(element.review_score.hasOwnProperty(key)) {
          if(element.review_score[key])
          result[element.review_score[key] - 1].data[keyArr[key]]++;
        }
      }
    });

    result[0].data.forEach( ( element, index ) => {
      const sum = result[0].data[index] + result[1].data[index] + result[2].data[index];
      result[0].data[index] = result[0].data[index] * 100 / sum;
      result[1].data[index] = result[1].data[index] * 100 / sum;
      result[2].data[index] = result[2].data[index] * 100 / sum;
    })

    res.send({ result: true, data: result });
  } catch (err) {
    console.error(err)
    res.send({ result: false })
  }
}