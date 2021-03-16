const db = require('../models')
const config = require('../config/auth.config')
const User = db.user

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.register = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    user_type: req.body.user_type,
    contact_number: req.body.contact_number
  })
    .then(user => {
      const token = jwt.sign({ username: user.username }, config.secret, {
        expiresIn: 86400 // 24 hours
      })

      res.send({ 
        message: 'User was registered.',
        token: token
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

exports.login = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' })
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      )

      if (!passwordIsValid) {
        return res.status(401).send({
          message: 'Invalid Password!'
        })
      }

      const token = jwt.sign({ username: user.username }, config.secret, {
        expiresIn: 86400 // 24 hours
      })

      res.status(200).send({
        username: user.username,
        user_type: user.user_type,
        token: token
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}
