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
  function (req, res, next) { authJwt.verifyToken(req, res, next) },
  authJwt.isCustomer, verifyOrder.checkOrder,
  function (req, res, next) {
    controller.createOrder(req, res, next)
  }
)

router.post(
  '/getcurrentorder',
  function (req, res, next) { authJwt.verifyToken(req, res, next) },
  authJwt.isCustomer,
  function (req, res, next) {
    controller.getCurrentOrder(req, res, next)
  }
)

router.post(
  '/addtoorder',
  function (req, res, next) { authJwt.verifyToken(req, res, next) },
  authJwt.isCustomer,
  function (req, res, next) {
    controller.addToOrder(req, res, next)
  }
)

router.post(
  '/removefromorder',
  function (req, res, next) { authJwt.verifyToken(req, res, next) },
  authJwt.isCustomer,
  function (req, res, next) {
    controller.removeFromOrder(req, res, next)
  }
)

router.post(
  '/checkout',
  function (req, res, next) { authJwt.verifyToken(req, res, next) },
  authJwt.isCustomer,
  function (req, res, next) {
    controller.checkout(req, res, next)
  }
)

router.get(
  '/getmenu',
  function (req, res, next) {
    controller.getMenu(req, res, next)
  }
)

router.post(
  '/getuser',
  function (req, res, next) { authJwt.verifyToken(req, res, next) },
  function (req, res, next) {
    controller.getUser(req, res, next)
  }
)

module.exports = router
