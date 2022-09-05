const express = require('express')
const router = express.Router()

const { addToOrganisation } = require('../controllers/organisation')
const {
  userById,
  requireSignIn,
  create_User,
  get_User,
  isAuth,
  isAdmin,
} = require('../controllers/user')

router.post('/signin', get_User)

router.post('/signup', create_User, addToOrganisation)

module.exports = router
