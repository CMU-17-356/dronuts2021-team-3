const jwt = require('jsonwebtoken')
const config = require('../config/auth.config.js')
const db = require('../models')
const User = db.user

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || ''

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
      req.username = decoded.username
      return next()
    }
  })
}

const isEmployee = (req, res, next) => {
  User.findOne({
    where: {
      username: req.username
    }
  }).then(user => {
    if (!user) {
      return res.status(403).send({
        message: 'Require Employee Role!'
      })
    }

    if (user.user_type === 'employee') {
      return next()
    }
  })
}

const isCustomer = (req, res, next) => {
  User.findOne({
    where: {
      username: req.username
    }
  }).then(user => {
    if (!user) {
      return res.status(403).send({
        message: 'Require Employee Role!'
      })
    }

    if (user.user_type === 'customer') {
      return next()
    }
  })
}

const authJwt = {
  verifyToken: verifyToken,
  isEmployee: isEmployee,
  isCustomer: isCustomer
}

module.exports = authJwt
