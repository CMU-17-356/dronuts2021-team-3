const models = require('../models/models')

const checkOrder = (req, res, next) => {
  const result = models.order.validate(req.body, { stripUnknown: true })
  if (result.error) {
    return res.status(400).send({
      message: result.error.message
    })
  }

  return next()
}

const verifyOrder = {
  checkOrder: checkOrder
}

module.exports = verifyOrder
