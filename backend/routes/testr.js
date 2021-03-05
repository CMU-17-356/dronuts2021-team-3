const express = require('express')
const router = express.Router()

const { authJwt } = require('../middleware')
const controller = require('../controllers/user.controller')

router.get(
  '/customer',
  authJwt.verifyToken,
  function (req, res, next) {
    controller.customerAccess(req, res, next)
  }
)

router.get(
  '/employee',
  authJwt.verifyToken, authJwt.isEmployee,
  function (req, res, next) {
    controller.employeeAccess(req, res, next)
  }
)

module.exports = router
