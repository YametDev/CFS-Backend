const express = require('express')
const reviewRouter = express.Router()
const CompanyController = require('../controllers/company')

let companyData;
async function getMongoDB() {
  companyData = await CompanyController.getAllData();
}
getMongoDB()
 
let exist;
async function getData(req, res){
  await getMongoDB()
  exist = 0;
  for(let i = 0; i < companyData.length; i++){
    if(companyData[i].name == req.body.company){
      exist = 1;
      res.send({result: true, data: companyData[i]})
    }
  }
  if(exist == 0){
    res.send({result: false, data: "Company Not Found"})
  }
}
// reviewRouter.post('/exists', CompanyController.exists)
reviewRouter.post('/exists', getData)
reviewRouter.post('/detail', CompanyController.detail)
module.exports = reviewRouter
