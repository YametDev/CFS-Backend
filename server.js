require('dotenv').config()

const http = require('http')
const mongoose = require('mongoose')
const app = require('./app')

const port = process.env.PORT

app.set('port', port)

const server = http.createServer(app)
const CompanyController = require('./controllers/company')
async function startServer() {
  try {
    mongoose
      .connect(process.env.MONGODB_URL_LOCAL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      .then(() => {
        server.listen(port, () => {
          console.log(
            `Connected to local - Database for http server to port ${port}`,
          )
          
        })
      })
      .catch((err) => {
        console.log(err)
      })
  } catch (err) {
    console.error('Error connecting to database', err)
    process.exit(1)
  }
}

startServer()



