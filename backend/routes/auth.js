const express = require('express')
const router = express.Router()

const { verifyRegister } = require('../middleware')
const controller = require('../controllers/auth.controller')

router.use(
  function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  }
)

router.post(
  '/register',
  verifyRegister.checkDuplicateUsername,
  function (req, res, next) {
    controller.register(req, res, next)
  }
)

router.post(
  '/login',
  function (req, res, next) {
    controller.login(req, res, next)
  }
)

module.exports = router
