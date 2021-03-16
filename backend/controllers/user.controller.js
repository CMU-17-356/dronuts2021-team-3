const db = require('../models')
const axios = require('axios')
const Order = db.order
const Product = db.product
const OrderProduct = db.orderproduct
const User = db.user

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
    ],
    include: Product
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
        Order.create({
          username: req.body.username
        })
        .then(order => {
          if (!req.body.product_id) {
            return res.status(404).send({ message: 'Product Not found.' })
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

            OrderProduct.findOne({
              where: {
                product_id: req.body.product_id,
                order_id: order.dataValues.order_id
              }
            })
            .then(orderproduct => {
              orderproduct.update({
                quantity: req.body.quantity
              })
            })
            .catch(err => {
              OrderProduct.create({
                product_id: req.body.product_id,
                order_id: order.dataValues.order_id,
                quantity: req.body.quantity
              })
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
      else {
        if (!req.body.product_id) {
          return res.status(404).send({ message: 'Product Not found.' })
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

            OrderProduct.findOne({
              where: {
                product_id: req.body.product_id,
                order_id: order.dataValues.order_id
              }
            })
            .then(orderproduct => {
              orderproduct.update({
                quantity: req.body.quantity
              })
            })
            .catch(err => {
              OrderProduct.create({
                product_id: req.body.product_id,
                order_id: order.dataValues.order_id,
                quantity: req.body.quantity
              })
            })

            res.status(200).send({
              order: order.toJSON()
            })
          })
        }
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
          order_id: order.dataValues.order_id,
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
function createTransaction (totalCost) {
  return axios.post('http://credit.17-356.isri.cmu.edu/api/transactions', {
    companyId: 'team3',
    amount: totalCost
  }).then(res => res.data.id)
}

// Get our company's drones
function getDrones () {
  return axios.get('http://drones.17-356.isri.cmu.edu/api/airbases/team3')
    .then(res => res.data.drones)
}

// Get a drone's status
function getDroneStatus (droneId) {
  return axios.get('http://drones.17-356.isri.cmu.edu/api/drones/' + droneId)
    .then(res => res.data.current_delivery)
}

// Process a transaction
function processTransaction (transactionId, username, creditCard) {
  return axios.post('http://credit.17-356.isri.cmu.edu/api/transactions/' + transactionId + '/process', {
    id: transactionId,
    customer_details: username,
    credit_card: creditCard
  })
    .then(res => res.data.status)
}

// Send a drone
function sendDrone (droneId) {
  return axios.put('http://drones.17-356.isri.cmu.edu/api/drones/' + droneId + '/send', {
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
        .then(transactionId => {
          return processTransaction(transactionId, req.body.username, req.body.credit_card)
        })
        .then(processed => {
          return getDrones()
        })
        .then(droneIds => {
        // Find available drone
          let i = 0
          let drone = -1
          while (drone === -1) {
            i++
            i = i % droneIds.length
            drone = getDroneStatus(droneIds[i])
              .then(droneStatus => {
                if (droneStatus == null) return droneIds[i]
                return -1
              })
          }
          return i
        })
        .then(drone => {
          return sendDrone(drone)
        })
        .then(result => {
          return res.status(200).send({ message: 'Order completed.' })
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
    ],
    raw: true,
  })
    .then(product => {
      res.status(200).send({
        product: product
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

exports.getUser = (req, res) => {
  User.findOne ({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      res.status(200).send({
        user: user.toJSON()
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}