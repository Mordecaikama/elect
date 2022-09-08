const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const { isEmail } = require('validator')

const voterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter Organisation name'],
      maxlength: 32,
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email'],
    },
    voterkey: {
      type: String,
      required: [true, 'Please enter your password'],
      minlength: [6, 'Minimum voterkey Length is 6'],
    },
    voterid: {
      type: String,
      unique: true,
      required: [true, 'Please enter your password'],
      minlength: [4, 'Minimum voterid Length is 6'],
    },
    track: {
      type: String,
      default: '',
    },
    hasvoted: {
      type: Boolean,
    },
  },

  { timestamps: true }
)

const Voter = mongoose.model('Voter', voterSchema)

module.exports = Voter
