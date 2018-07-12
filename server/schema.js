const mongoose = require('mongoose')

const exerciseSchema = mongoose.Schema({
  description: String,
  duration: Number,
  reps: Number,
  weight: Number,
  date: {
    type: Date,
    default: new Date().toISOString().split('T')[0]
  }
})

const userSchema = mongoose.Schema({
  username: String,
  log: [
    exerciseSchema
  ]
})

exports.Exercise = mongoose.model('Exercise', exerciseSchema)
exports.User = mongoose.model('User', userSchema)
