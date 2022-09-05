const express = require('express')
const Election = require('../models/Election')
const Type = require('../models/Type')
const Candidate = require('../models/Candidate')
const jwt = require('jsonwebtoken')

exports.electionTypeById = (req, res, next, id) => {
  Type.findById(id).exec((err, typ) => {
    if (err || !typ) {
      return res.status(400).json({
        error: 'No Order found',
      })
    }
    req.type = typ
    next()
  })
}

// this creates candidate and saves the objectid as part of election type
exports.createCandidate = (req, res) => {
  // res.json({
  //   user: req.profile,
  //   type: req.type,
  //   body: req.body,
  // })

  // creates new election and saves it under an organisation
  const candidate = new Candidate(req.body)
  candidate
    .save()
    .then((data) => {
      console.log('successfully saved to db')
      // console.log(user._id)
      Type.findOneAndUpdate(
        { _id: req.type._id },
        { $push: { candidates: data } },
        { new: true },
        (error, data) => {
          if (error) {
            return res.status(400).json({
              error: 'Could not update election type from election db',
            })
          }
          res.json({ success: 'success done', msg: data })
        }
      )
    })
    .catch((err) => {
      res.send({ msg: err })
    })
}
