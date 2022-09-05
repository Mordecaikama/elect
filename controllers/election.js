const express = require('express')
const Election = require('../models/Election')
const Type = require('../models/Type')
const Organisation = require('../models/Organisation')
const jwt = require('jsonwebtoken')

exports.electionById = (req, res, next, id) => {
  Election.findById(id).exec((err, election) => {
    if (err || !election) {
      return res.status(400).json({
        error: 'No Order found',
      })
    }
    req.election = election
    next()
  })
}

exports.createElection = (req, res) => {
  // res.json({
  //   user: req.profile,
  //   organisation: req.organisation,
  //   body: req.body,
  // })

  // const user = req.profile
  // organisation = req.organisation
  // creates new election and saves it under an organisation
  const election = new Election(req.body)
  election
    .save()
    .then((data) => {
      console.log('successfully saved to db')
      // console.log(user._id)
      Organisation.findOneAndUpdate(
        { _id: req.organisation._id },
        { $push: { elections: data } },
        { new: true },
        (error, data) => {
          if (error) {
            return res.status(400).json({
              error: 'Could not Organisation',
            })
          }
          res.json({ success: 'success done', msg: data })
        }
      )
    })
    .catch((err) => {
      // let errors = handleErrors(err)
      res.send({ msg: err })
    })
}

// this creates election type and saves the objectid as part of elections
exports.electionType = (req, res) => {
  // res.json({
  //   user: req.profile,
  //   election: req.election,
  //   body: req.body,
  // })
  const electiontype = new Type(req.body)
  electiontype
    .save()
    .then((data) => {
      Election.findOneAndUpdate(
        { _id: req.election._id },
        { $push: { type: data } },
        { new: true },
        (error, data) => {
          if (error) {
            return res.status(400).json({
              error: 'Could update election type from election db',
            })
          }
          res.json({ success: 'success done', msg: data })
        }
      )
    })
    .catch((err) => {
      // let errors = handleErrors(err)
      res.send({ msg: err })
    })

  // req.elections = electiontype
}

// this updates election options like type and voters
exports.updateType = (req, res) => {
  req.body.type = req.elections

  console.log('updated from type', req.body.type)

  // res.send({ msg: 'success' })

  const election = new Election(req.body.type)

  election
    .save()
    .then((data) => {
      console.log('successfully saved to db')
      // console.log(user._id)

      res.send({ success: 'success done', data })
    })
    .catch((err) => {
      res.send({ msg: err })
    })
}
