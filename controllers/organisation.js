const express = require('express')
const Organisation = require('../models/Organisation')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.organiById = (req, res, next, id) => {
  console.log(id)
  Organisation.findById(id)
    .populate('size')
    .exec((err, data) => {
      if (err || !data) {
        return res.status(400).json({
          error: 'No Organisation found',
        })
      }
      req.organisation = data
      next()
    })
}

exports.addToOrganisation = (req, res) => {
  req.body.user = req.profile
  // res.json({ data: req.body })

  const org = new Organisation(req.body)

  org
    .save()
    .then((org) => {
      console.log('successfully saved to db')
      // console.log(user._id)

      res.send({ success: 'success done', org })
    })
    .catch((err) => {
      res.send({ msg: err })
    })
}
