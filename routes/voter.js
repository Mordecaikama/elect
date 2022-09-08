const express = require('express')
const router = express.Router()

const { addToVoter, voterById, votersignin } = require('../controllers/voter')
const {
  userById,
  requireSignIn,
  isAuth,
  isAdmin,
} = require('../controllers/user')
const { electionById } = require('../controllers/election')

router.post(
  '/addvoter/:userId/:electionId',
  requireSignIn,
  isAuth,
  isAdmin,
  addToVoter
)
router.post('/voter/login/:electionId', votersignin)

router.param('userId', userById) // save user information in all request made using userid
router.param('electionId', electionById)

//  userId is needed to authenticate user into app
// electionId is needed to pull a particular election
// populated request by userid can be updated by e.g
// const user = req.body.profile
// user.name = 'mordecai'
// await user.save()

module.exports = router
