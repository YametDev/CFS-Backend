const Review = require('../models/review')

module.exports.getAll = async (req, res) => {
  try {
    const data = await Review.find({})
    const cal = [0, 0, 0, 0, 0];

    data.forEach( val => { cal[val.rating - 1] ++; });
    const result = cal.map( (val, ind) => ({
      level: ( ind + 1 ) + " Star",
      percentage: ( val * 100 ) / data.length
    }));

    res.send({ result: true, data: result });
  } catch (err) {
    console.error(err)
    res.send({ result: false })
  }
}

module.exports.addOne = async (req, res) => {
  try {
    console.log("-------------------------------->\n", req.body, "\n-------------------------------->");
    const newReview = new Review(req.body);
    newReview.save()
    .then(savedRecord => {
      res.send({
        result: true
      })
    })
    .catch(error => {
      throw error
    })
  } catch (err) {
    console.error(err)
    res.send({ result: false })
  }
}