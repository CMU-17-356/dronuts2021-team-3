const express = require('express')
const router = express.Router()

const { authJwt, verifyOrder } = require('../middleware')
const controller = require('../controllers/user.controller')

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
  '/createorder',
  authJwt.verifyToken, authJwt.isCustomer, verifyOrder.checkOrder,
  function (req, res, next) {
    controller.createOrder(req, res, next)
  }
)

router.get(
  '/getcurrentorder',
  authJwt.verifyToken, authJwt.isCustomer,
  function (req, res, next) {
    controller.getCurrentOrder(req, res, next)
  }
)

router.post(
  '/addtoorder',
  authJwt.verifyToken, authJwt.isCustomer,
  function (req, res, next) {
    controller.addToOrder(req, res, next)
  }
)

router.post(
  '/addtoorder',
  authJwt.verifyToken, authJwt.isCustomer,
  function (req, res, next) {
    controller.removeFromOrder(req, res, next)
  }
)

router.post(
  '/checkout',
  authJwt.verifyToken, authJwt.isCustomer,
  function (req, res, next) {
    controller.checkout(req, res, next)
  }
)

module.exports = router
