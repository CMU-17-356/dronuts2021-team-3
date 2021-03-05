const db = require("../models");
const models = require('../models/models')
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsername = (req, res, next) => {
  const result = models.user.validate(req.body);
  if (result.error) {
    return res.status(400).send({
      message: result.error.message
    });
  }

  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      return res.status(400).send({
        message: "Failed! Username is already in use!"
      });
    }
    else {
      return next();
    }
  });
}

const verifyRegister = {
  checkDuplicateUsername: checkDuplicateUsername
}

module.exports = verifyRegister