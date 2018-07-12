const express = require('express')
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./schema').User
const Exercise = require('./schema').Exercise
const path = require('path')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('dev'))

// end point for getting user's exercise log
app.get('/api/exercise/log', (req, res) =>{
  const username = req.query.username
  const from = Date.parse(req.query.from)
  const to = Date.parse(req.query.to)

  if(!username) return res.json('username required')

  User.findOne({ username }, { log: { $slice: 20 } })
    .exec((err, user) => {
      if (err) return res.json(err)
      if (!user) return res.json('user not found')
      let output;
      if (from && to) {output = user.log.filter(item => Date.parse(item.date) >= from && Date.parse(item.date) <= to)}
      else if (from) {output = user.log.filter(item => Date.parse(item.date) >= from)}
      else if (to) {output = user.log.filter(item => Date.parse(item.date) <= to)}
      else {output = user.log}
      output.sort((obj1, obj2) => obj2.date - obj1.date)
      res.json(output)
    })
})

// end point for signing up a new user
app.post('/api/exercise/new-user', (req, res) => {
  const username = req.body.username
  
  if (!username) return res.json('username is required') 
  
  User.findOne({ username }, (err, user) => {
    if (err) return res.status(500).json(err)
    else if (user) return res.status(200).json('user already exists')
    else {
      const user = new User({
        username,
      })
      user.save()
      res.status(201).json({user: user.username, id: user._id})
    } 
  })
})

// end point for adding a new exercise
app.post('/api/exercise/add', (req, res) => {
  const username = req.body.username
  const description = req.body.description
  const duration = req.body.duration
  const reps = req.body.reps
  const weight = req.body.weight
  const date = req.body.date
  
  if (!username) return res.json('username is required')
  if (!description) return res.json('description is required')
  User.findOne({ username }, (err, user) => {
    if (err) res.json(err)
    else if (!user) res.json('user not found')
    else {
      const exercise = new Exercise({
        description,
        duration,
        reps,
        weight,
        date
      })
      user.log.push(exercise)
      user.save()
      res.status(201).json(exercise)
    }
  })
})

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is listening on port 8000!')
});