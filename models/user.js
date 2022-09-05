const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your username'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minlength: [6, 'Minimum password Length is 6'],
    },
    admin: {
      type: Boolean,
      required: true,
    },
    acc_setup: {
      type: Boolean,
    },
    acc_verify_at: {
      type: String,
    },
    can_use_coupon: {
      type: Boolean,
    },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)

  next()
})

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email })
  // return users
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }

    throw Error('incorrect password')
  }
  throw Error('incorrect email')
}

const User = mongoose.model('User', userSchema)

module.exports = User
