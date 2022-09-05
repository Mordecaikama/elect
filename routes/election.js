const express = require('express')
const router = express.Router()

const {
  createElection,
  electionType,
  updateType,
  electionById,
} = require('../controllers/election')
const {
  userById,
  requireSignIn,
  isAuth,
  isAdmin,
} = require('../controllers/user')
const { organiById } = require('../controllers/organisation')

router.post(
  '/create-election/:userId/:organiId',
  requireSignIn,
  isAuth,
  isAdmin,
  createElection
)

router.post(
  '/create-type/:userId/:electionId',
  requireSignIn,
  isAuth,
  isAdmin,
  electionType
)

router.param('userId', userById) // save user information in all request made using userid
router.param('electionId', electionById)
router.param('organiId', organiById)

//  userId is needed to authenticate user into app
// organiId is needed to pull a particular organisation
// populated request by useris can be updated by e.g
// const user = req.body.profile
// user.name = 'mordecai'
// await user.save()

module.exports = router
