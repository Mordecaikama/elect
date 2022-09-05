const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const { isEmail } = require('validator')

const candidateSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter Organisation name'],
      maxlength: 32,
    },
    gender: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email'],
    },
    image: { type: String },
    votes: {
      type: Number,
    },
  },

  { timestamps: true }
)

const Candidate = mongoose.model('Candidate', candidateSchema)

module.exports = Candidate
