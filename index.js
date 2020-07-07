const express = require('express')
require('dotenv').config()  //Keep for now... 

const helmet = require('helmet') //security feature? 
const bodyParser = require('body-parser')  //Json to usable data ** highly important
const cors = require('cors') //Evil program of doom....can i delete?
const morgan = require('morgan') // some sort of logging
var db = require('knex')({
  client: 'pg',
  connection: {
      host: 'localhost',
      user: 'me',
      password: '!QAZxsw2',
      database: 'users'
  }
});

// Standard way to connect to Postgres -- Using template for the moment 
// const Pool = require('pg').Pool  //standard library object for connecting to DB
// const pool = new Pool({
//   user: 'me',
//   host: 'localhost',
//   database: 'users',
//   password: '!QAZxsw2',
//   port: 5432, //5432 is Postgres default

const main = require('./controllers/main') //db queries

const app = express()

const corsOptions = { // Can I haz evil code?  Please delete if possible
    origin: function (origin, callback){
        if (whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(helmet())  //some sort of magic security -- research later
app.use(cors(corsOptions)) // evilness
app.use(bodyParser.json()) //readable json
app.use(morgan('combined')) // logging 

app.get('/', (req, res) => res.send('hello world'))
app.get('/users', (req, res) => main.getUserData(req,res,db))
app.post('/users', (req, res) => main.postUserData(req,res,db))
app.put('/users', (req, res) => main.putUserData(req,res,db))
app.delete('/users', (req,res) => main.deleteUserData(req,res,db))

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT || 3000}`)
}) // Alternative to the standard port check using environment variable or defaulting to 3000