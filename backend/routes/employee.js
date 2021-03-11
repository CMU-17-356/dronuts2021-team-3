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

router.get(
  '/getalldrones',
  authJwt.verifyToken, authJwt.isEmployee,
  function (req, res, next) {
    controller.getAllDrones(req, res, next)
  }
)

router.get(
  '/getpendingorders',
  authJwt.verifyToken, authJwt.isEmployee,
  function (req, res, next) {
    controller.getPendingOrders(req, res, next)
  }
)

router.post(
  '/completeorder',
  authJwt.verifyToken, authJwt.isEmployee,
  function (req, res, next) {
    controller.completeOrder(req, res, next)
  }
)

module.exports = router
