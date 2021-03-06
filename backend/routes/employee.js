const express = require('express')
const router = express.Router()

const { authJwt } = require('../middleware')
const controller = require('../controllers/employee.controller')

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
  '/getalldrones',
  function (req, res, next) { authJwt.verifyToken(req, res, next) },
  authJwt.isEmployee,
  function (req, res, next) {
    controller.getAllDrones(req, res, next)
  }
)

router.post(
  '/getpendingorders',
  function (req, res, next) { authJwt.verifyToken(req, res, next) },
  authJwt.isEmployee,
  function (req, res, next) {
    controller.getPendingOrders(req, res, next)
  }
)

router.post(
  '/completeorder',
  function (req, res, next) { authJwt.verifyToken(req, res, next) },
  authJwt.isEmployee,
  function (req, res, next) {
    controller.completeOrder(req, res, next)
  }
)

module.exports = router
