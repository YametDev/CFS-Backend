const nodemailer = require('nodemailer');
const DetailReview = require('../models/review_detail')
const template = require('./../template');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'heliyamet3190@gmail.com',
    pass: 'youaremyeverything'
  }
});

let mailOptions = {
  from: 'heliyamet3190@gmail.com',
  to: 'heliyamet3190@gmail.com',
  subject: 'New Review',
  text: "Hello!"
};

module.exports.getAll = async (req, res) => {
  try {
    const data = await DetailReview.find({});
    console.log("------------------------------>Detailed Reviews\n", data);

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
          console.log("HHH------------------------------->\n", key, ":", element.review_score[key], ":", result);
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

module.exports.addOne = async (req, res) => {
  try {
    console.log("-------------------------------->\n", req.body, "\n-------------------------------->");
    const newReview = new DetailReview(req.body);
    newReview.save()
    .then(() => {
      transporter.sendMail(
        mailOptions,
        // {
        //   ...mailOptions,
        //   html: template.template(req.body)
        // },
        (error, info) => {
        if (error) {
          console.log('Error occurred while sending email:', error.message);
        } else { console.log('Email sent successfully!\n', info); }
      });
      res.send({ result: true });
    })
    .catch(error => { throw error })
  } catch (err) { res.send({ result: false }) }
}