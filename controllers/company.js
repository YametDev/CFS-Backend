const Company = require('../models/company')

const getReturnValue = (result, data) => {
  return {
    result,
    data,
  }
}

module.exports.exists = (req, res) => {
  Company.findOne({ name: req.body.company }, (err, val) => {
    if (err) {
      res.send(getReturnValue(false, err.toString()))
    } else if (val) {
      res.send(getReturnValue(true, val))
    } else {
      res.send(getReturnValue(false, 'Company Not Found'))
    }
  })
}

module.exports.getAllData = async () => {
  try {
    const data = await Company.find({})
    return data
  } catch (err) {
    console.log(err)
    return []
  }
}

module.exports.detail = async (req, res) => {
  try {
    let updateFields = {};
    Object.keys(req.body).forEach(key => {
      if(key !== "company"){
        updateFields = {
          ...updateFields,
          [key]: req.body[key]
        }
      }
    })
    Company.findOneAndUpdate({ name: req.body.company }, updateFields, {
      upsert: true,
      new: true,
    })
      .then((updatedDocument) => {
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
