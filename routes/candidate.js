const express = require('express')
const router = express.Router()

const {
  createCandidate,
  electionTypeById,
} = require('../controllers/candidate')
const {
  userById,
  requireSignIn,
  isAuth,
  isAdmin,
} = require('../controllers/user')

router.post(
  '/create-candidate/:userId/:typeId',
  requireSignIn,
  isAuth,
  isAdmin,
  createCandidate
)

router.param('userId', userById) // save user information in all request made using userid
// router.param('electionId', electionById)
router.param('typeId', electionTypeById)

//  userId is needed to authenticate user into app
// organiId is needed to pull a particular organisation
// populated request by useris can be updated by e.g
// const user = req.body.profile
// user.name = 'mordecai'
// await user.save()

module.exports = router
