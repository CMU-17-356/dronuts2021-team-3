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
    where: {
      payment_status: 'paid',
      delivery_status: 'preparing'
    },
    order: [
      ['order_id', 'ASC']
    ],
    include: Product
  })
    .then(order => {
      res.status(200).send({
        order: order
      })
    })
    .catch(err => {
      console.log("err:" + err)
      res.status(500).send({ message: err.message })
    })
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

// Send a drone
function sendDrone (droneId) {
  return axios.put('http://drones.17-356.isri.cmu.edu/api/drones/' + droneId + '/send', {
    lat: 40.44,
    lon: -79.94
  })
    .then(res => res.data.current_delivery)
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
      order.update({ delivery_status: 'ready for delivery' })
      
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
    .then(sent => {
      res.status(200).send({
        message: 'Order marked as ready for delivery.'
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}
