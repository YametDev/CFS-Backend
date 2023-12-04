const Company = require('../models/company');

const getReturnValue = (result, data) => {
  return {
    result: result,
    data: data
  };
}

module.exports.exists = (req, res) => {
  Company.findOne( {name: req.body.company}, (err, val) => {
    if(err) { res.send(getReturnValue(false, err.toString())) }
    else if(val) { res.send(getReturnValue(true, val)) }
    else { res.send(getReturnValue(false, "Company Not Found")) }
  })
}

module.exports.getAllData = async() => {
  try {
    data = await Company.find({});
    return data;
  } catch (err) {
    console.log(err)
  }
}

module.exports.detail = async (req, res) => {
  try {
    const updateFields = {
      name: req.body.company,
      button: req.body.button,
      star: req.body.star,
      managers: req.body.manager,
      google: req.body.googleId,
      customer: 'https://leavefeedback.org/' + req.body.company,
      dashboard: 'https://leavefeedback.org/' + req.body.company,
      logo: req.body.logo,
      street: req.body.street,
      alertSMS: req.body.alertSMS,
      alertEmail: req.body.alertEmail,
    };
    Company.findOneAndUpdate({name: req.body.company}, updateFields, { upsert:true, new: true })
      .then(updatedDocument  => {
        res.send({ result: true })
        
      })
      .catch(error => {
        console.log(error);
        res.send({ result: false })
      });
  } catch (err) {
    console.error(err)
    res.send({ result: false })
  }
}