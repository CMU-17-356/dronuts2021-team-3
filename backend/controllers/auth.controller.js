const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.register = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    user_type: req.body.user_type,
    contact_number: req.body.contact_number,
  })
    .then(user => {  
      var token = jwt.sign({ username: user.username }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
  
      res.cookie('token', token)
  
      res.send({ message: "User was registered." })
      return;
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
      return;
    });
};


exports.login = (req, res) => {
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ username: user.username }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
  
        res.cookie('token', token)
        res.status(200).send({
          username: user.username,
          user_type: user.user_type,
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };