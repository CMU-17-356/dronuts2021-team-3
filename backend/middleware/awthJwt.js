const jwt = require('jsonwebtoken')
const config = require('../config/auth.config.js')
const db = require('../models')
const User = db.user

const verifyToken = (req, res, next) => {
  const token = req.body.token || ''

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!'
    })
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!'
      })
    } else {
      req.body.username = decoded.username
      return next()
    }
  })
}

const isEmployee = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (!user || user.user_type !== 'employee') {
      return res.status(403).send({
        message: 'Require Employee Role!'
      })
    }

    return next()
  })
}

const isCustomer = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (!user || user.user_type !== 'customer') {
      return res.status(403).send({
        message: 'Require Customer Role!'
      })
    }

    return next()
  })
}

const authJwt = {
  verifyToken: verifyToken,
  isEmployee: isEmployee,
  isCustomer: isCustomer
}

module.exports = authJwt
