const express = require('express')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
require('dotenv').config()

const handleErrors = (err) => {
  let error = {
    name: '',
    email: '',
    telephone: '',
    dob: '',
    password: '',
    admin: '',
  }

  // incorrect email
  if (err.message === 'incorrect email') {
    error.email = 'Email is not registered'
    return error
  }
  if (err.message === 'incorrect password') {
    error.password = 'incorrect password'
    return error
  }

  if (err.code === 11000) {
    error.email = 'this email is taken'
    return error
  }

  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message
    })
  }
  return error
}

const maxAge = 60 * 60
const createToken = (id) => {
  return jwt.sign({ id }, process.env.jt, {
    expiresIn: maxAge,
  })
}

const userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      // console.log(err, id)
      return res.status(400).json({ error: 'User not found' })
    }
    req.profile = user
    next()
  })
}

const create_User = (req, res, next) => {
  const user = new User(req.body)
  user.save((err, data) => {
    if (err) {
      const errors = handleErrors(err)
      res.json({ err: errors })
    } else {
      req.profile = data
      next()
    }
  })
}

const get_User = async (req, res) => {
  const { email, password } = req.body
  console.log('user ', email, ' attempting to login')

  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      // sameSite: 'None',
    })
    res.status(200).send({ user, token })
  } catch (error) {
    // const errors = handleErrors(error)
    res.send({ msg: error })
  }
}

const requireSignIn = expressJwt({
  secret: process.env.jt,
  userProperty: 'auth',
  algorithms: ['HS256'],
})

const isAuth = (req, res, next) => {
  console.log(req.auth)
  // res.send('me')
  let user = req.profile && req.auth && req.profile._id == req.auth.id
  console.log(req.auth)
  if (!user) {
    return res.status(403).json({
      error: 'Access denied',
    })
  }
  next()
}

const isAdmin = (req, res, next) => {
  if (req.profile.admin === false) {
    return res.status(403).json({
      error: 'Admin resource! Access denied',
    })
  }
  next()
}

module.exports = {
  requireSignIn,
  create_User,
  get_User,
  isAuth,
  isAdmin,
  userById,
}
