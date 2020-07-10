/////////////
//  DrinkNav Joint Project -- User information access project
//  Disabled Everything CORS related to prevent conflicts
///////////

const express = require('express')
require('dotenv').config()  //Keep for now... 

const helmet = require('helmet') //security feature? 
const bodyParser = require('body-parser')  //Json to usable data ** highly important
//const cors = require('cors') //Evil program of doom....can i delete?

const morgan = require('morgan') // some sort of logging
var db = require('knex')({
  client: 'pg',
  connection: {
      connectionString: "postgres://xlpucsdl:Yc0OCuq_vNxDzDne9M2dbCtPQXUg65T2@ruby.db.elephantsql.com:5432/xlpucsdl",
      max: 3
      //##TODO create env variable to grab password for security purposes 
      // host: 'localhost',
      // user: 'me',
      // password: '!QAZxsw2',
      // database: 'users',
      // port: 5432
  }
});

const main = require('./controllers/main') //db queries
const app = express()

// const whitelist = ['http://localhost:5432'] //Allows front end communication through port 3001
// const corsOptions = { // Can I haz evil code?  Please delete if possible
//     origin: function (origin, callback){
//         if (whitelist.indexOf(origin) !== -1 || !origin){
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }

app.use(helmet())  //some sort of magic security -- research later
// app.use(cors(corsOptions)) // evilness
app.use(bodyParser.json()) //readable json
app.use(morgan('combined')) // logging 

//Internal datacalls
app.get('/', (req, res) => res.send('hello world'))
app.get('/users', (req, res) => main.getTableData(req,res,db))
app.post('/users', (req, res) => main.postTableData(req,res,db))
app.put('/users', (req, res) => main.putTableData(req,res,db))
app.delete('/users', (req,res) => main.deleteTableData(req,res,db))
//Friend Join Table
app.post('/friendsAdd', (req,res) => main.postFriendData(req,res,db))
app.get('/friends', (req,res) => main.getLastTableEntry(req,res,db))
//external datacalls
app.get('/drinkList', (req,res) => main.getDrinkData(req,res,db))
app.get('/userDrinks', (req,res) => main.getUserDrinks(req,res,db))

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT || 3000}`)
}) // Alternative to the standard port check using environment variable or defaulting to 3000