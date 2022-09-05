var fs = require('fs')
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const routesUser = require('./routes/user')
const routesElection = require('./routes/election')
const routesCandidate = require('./routes/candidate')

require('dotenv').config()

// middleware
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

var dbname = 'javatpoint_db'

mongoose
  .connect(process.env.base_db || null) // db is online resource, referenced at the top
  .then(() => {
    console.log('connected to db successfully')
  })
  .catch((e) => {
    console.log(e)
  })

//middleware routes
app.use('/api', routesUser)
app.use('/api', routesElection)
app.use('/api', routesCandidate)

const writefile = (text) => {
  const varToString = (text) => Object.keys(text)[0]

  fs.appendFile(
    '.env',
    `${varToString({ dbname })}=${dbname}\r\n\r\n`,
    (err, data) => {
      console.log('done')
    }
  )
}

const readfile = () => {
  fs.readFile('.env', (err, data) => {
    console.log(data)
  })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log('server connected on port ', PORT)
})
