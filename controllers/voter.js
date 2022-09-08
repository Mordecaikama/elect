const express = require('express')
const Voter = require('../models/Voter')
const Election = require('../models/Election')

exports.voterById = (req, res, next, id) => {
  Voter.findById(id).exec((err, voter) => {
    if (err || !voter) {
      return res.status(400).json({
        error: 'No voter found',
      })
    }
    req.voter = voter
    next()
  })
}

// this creates election type and saves the objectid as part of elections
exports.addToVoter = (req, res) => {
  // res.json({
  //   user: req.profile,
  //   election: req.election,
  //   body: req.body,
  // })
  const voter = new Voter(req.body)
  voter
    .save()
    .then((data) => {
      Election.findOneAndUpdate(
        { _id: req.election._id },
        { $push: { voters: data } },
        { new: true },
        (error, data) => {
          if (error) {
            return res.status(400).json({
              error: 'Could not update voter from election db',
            })
          }
          res.json({ success: 'success done', msg: data })
        }
      )
    })
    .catch((err) => {
      // let errors = handleErrors(err)
      res.send({ msg: err })
      console.log(err)
    })

  // req.elections = electiontype
}

exports.votersignin = async (req, res) => {
  if (req.election) {
    const { voterkey, voterid } = req.body
    // this checks if voter belong to the particular election
    // if true verifies voter details
    var more = []

    const voter = await Voter.findOne({ voterid })
    const new_voter = req.election.voters.map((ele, ind) =>
      console.log(ele._id == voter._id)
    )
    voter && res.json({ msg: voter, election: req.election.type })
  }
}

exports.voting = async (req, res) => {
  console.log('notin')
}
