const db = require('../models')
const Drone = db.drone
const Order = db.order

exports.getAllDrones = (req, res) => {
  Drone.findAll({
    order: [
      ['drone_id', 'ASC']
    ]
  })
    .then(drone => {
      res.status(200).send({
        drone: drone.toJSON()
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

exports.getPendingOrders = (req, res) => {
  Order.findAll({
    where: {
      payment_status: 'paid',
      delivery_status: 'preparing'
    },
    order: [
      ['order_id', 'ASC']
    ]
  })
    .then(order => {
      res.status(200).send({
        order: order.toJSON()
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

exports.completeOrder = (req, res) => {
  Order.findOne({
    where: {
      order_id: req.body.order_id
    }
  })
    .then(order => {
      if (!order) {
        return res.status(404).send({ message: 'Order Not found.' })
      }
      order.delivery_status = 'ready for delivery'
      res.status(200).send({
        message: 'Order marked as ready for delivery.'
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}
