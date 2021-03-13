const db = require('../models')
const axios = require('axios')
const Order = db.order
const Product = db.product
const OrderProduct = db.orderproduct

exports.createOrder = (req, res) => {
  Order.create({
    username: req.body.username
  })
    .then(order => {
      res.send({ message: 'Order was created.' })
    })

    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

exports.getCurrentOrder = (req, res) => {
  Order.findOne({
    where: {
      username: req.body.username,
      delivery_status: 'not paid'
    },
    order: [
      ['createdAt', 'DESC']
    ]
  })
    .then(order => {
      if (!order) {
        return res.status(404).send({ message: 'Order Not found.' })
      }

      res.status(200).send({
        order: order.toJSON()
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

exports.addToOrder = (req, res) => {
  Order.findOne({
    where: {
      username: req.body.username,
      delivery_status: 'not paid'
    },
    order: [
      ['createdAt', 'DESC']
    ]
  })
    .then(order => {
      if (!order) {
        return res.status(404).send({ message: 'Order Not found.' })
      }

      Product.findOne({
        where: {
          product_id: req.body.product_id
        }
      })
        .then(product => {
          if (!product) {
            return res.status(404).send({ message: 'Product Not found.' })
          }

          OrderProduct.create({
            order_id: order.order_id,
            product_id: req.body.product_id
          })

          res.status(200).send({
            order: order.toJSON()
          })
        })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

exports.removeFromOrder = (req, res) => {
  Order.findOne({
    where: {
      username: req.body.username,
      delivery_status: 'not paid'
    },
    order: [
      ['createdAt', 'DESC']
    ]
  })
    .then(order => {
      if (!order) {
        return res.status(404).send({ message: 'Order Not found.' })
      }

      OrderProduct.findOne({
        where: {
          order_id: req.body.order_id,
          product_id: req.body.product_id
        }
      })
        .then(orderproduct => {
          if (!orderproduct) {
            return res.status(404).send({ message: 'Product Not found.' })
          }

          orderproduct.destroy()

          res.status(200).send({
            message: 'product removed'
          })
        })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

// Create a transaction
function createTransaction(total_cost) {
  return axios.post('http://credit.17-356.isri.cmu.edu/api/transactions', {
    companyId: 'team3',
    amount: total_cost
  }).then(res => res.data.id)
}

// Get our company's drones
function getDrones() {
  return axios.get('http://drones.17-356.isri.cmu.edu/api/airbases/team3')
  .then(res => res.data.drones)
}

// Get a drone's status
function getDroneStatus(drone_id) {
  return axios.get('http://drones.17-356.isri.cmu.edu/api/drones/' + drone_id)
  .then(res => res.data.current_delivery)
}

// Process a transaction
function processTransaction(transaction_id, username, credit_card) {
  return axios.post('http://credit.17-356.isri.cmu.edu/api/transactions/' + transaction_id + '/process', {
                  id: transaction_id,
                  customer_details: username,
                  credit_card: credit_card })
  .then(res => res.data.status)
}

// Send a drone
function sendDrone(drone_id) {
  return axios.put('http://drones.17-356.isri.cmu.edu/api/drones/' + drone_id + '/send', {
    lat: 40.44,
    lon: -79.94
  })
  .then(res => res.data.current_delivery)
}

exports.checkout = (req, res) => {
  // This is bad. Sorry.
  Order.findOne({
    where: {
      username: req.body.username,
      delivery_status: 'not paid'
    },
    order: [
      ['createdAt', 'DESC']
    ]
  })
    .then(order => {
      if (!order) {
        return res.status(404).send({ message: 'Order Not found.' })
      }

      // Create  and process transaction        
      createTransaction(order.total_cost)
      .then(transaction_id => {
        return processTransaction(transaction_id, req.body.username, req.body.credit_card)
      })
      .then(processed => {
        return getDrones()
      })
      .then(drone_ids => {
        // Find available drone
        var i = 0
        var drone = -1
        while (drone === -1) {
          i++
          i = i % drone_ids.length
          drone = getDroneStatus(drone_ids[i])
          .then(drone_status => {
            if (drone_status == null) return drone_ids[i]
            return -1
          })
        }
        return i
      })
      .then(drone => {
        return sendDrone(drone)
      })
      .then(result => {
        return res.status(200).send({ message: "Order completed." })
      })
      .catch(err => {
        return res.status(500).send({ message: err })
      })

    })
    .catch(err => {
      return res.status(500).send({ message: err.message })
    })
}

exports.getMenu = (req, res) => {
  Product.findAll({
    order: [
      ['product_id', 'ASC']
    ]
  })
    .then(product => {
      res.status(200).send({
        product: product.toJSON()
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}
