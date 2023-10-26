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
    else if(val) { res.send(getReturnValue(true, val.google)) }
    else { res.send(getReturnValue(false, "Company Not Found")) }
  })
}