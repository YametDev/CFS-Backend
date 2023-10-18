const DetailReview = require('../models/review_detail')

module.exports.getAll = async (req, res) => {
  try {
    const data = await DetailReview.find({})
    
    console.log("SQL Detail Data --------------------------->\n", data);

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
          result[element.review_score[key]-1].data[keyArr[key]]++;
        }
      }
    });

    console.log("Temp Result -------------------------------------->\n", result);

    result[0].data.forEach( ( element, index ) => {
      const sum = result[0].data[index] + result[1].data[index] + result[2].data[index];
      result[0].data[index] = result[0].data[index] * 100 / sum;
      result[1].data[index] = result[1].data[index] * 100 / sum;
      result[2].data[index] = result[2].data[index] * 100 / sum;
    })

    console.log("Result -------------------------------------->\n", result);

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