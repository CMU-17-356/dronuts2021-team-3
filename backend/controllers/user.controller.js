const db = require('../models')
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

exports.checkout = (req, res) => {
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

      // Create Transaction
      // Send to API

      // Get all drones
      // Choose one
      // Send it

      res.status(200).send({
        message: 'Order placed sucessfully.'
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
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
