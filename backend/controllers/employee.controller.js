const db = require('../models')
const axios = require('axios')
const Order = db.order
const Product = db.product

exports.getAllDrones = (req, res) => {
  axios.get('http://drones.17-356.isri.cmu.edu/api/airbases/team3')
    .then(res => {
      const requests = []
      for (let i = 0; i < res.data.drones.length; i++) {
        requests.push(axios.get('http://drones.17-356.isri.cmu.edu/api/drones/' + res.data.drones[i]))
      }

      return axios.all(requests)
    })
    .then(responses => {
      const drones = []
      for (let i = 0; i < responses.length; i++) {
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
    order: [
      ['order_id', 'ASC']
    ],
    include: Product
  })
    .then(order => {
      console.log("found orders")
      res.status(200).send({
        order: order
      })
    })
    .catch(err => {
      console.log("err:" + err)
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
