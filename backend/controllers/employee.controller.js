const db = require('../models')
const axios = require('axios')
const Order = db.order

exports.getAllDrones = (req, res) => {
    axios.get('http://drones.17-356.isri.cmu.edu/api/airbases/team3')
    .then(res => {
      var requests = [];
      for (var i = 0; i < res.data.drones.length; i++) {
        requests.push(axios.get('http://drones.17-356.isri.cmu.edu/api/drones/' + res.data.drones[i]))
      } 

      return axios.all(requests)
    })
    .then(responses => {
      var drones = [];
      for (var i = 0; i < responses.length; i++) {
        drones.push(responses[i].data)
      }
      res.status(200).send({
        drones: drones
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
