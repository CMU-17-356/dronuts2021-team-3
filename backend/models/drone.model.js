module.exports = (sequelize, Sequelize) => {
  const Drone = sequelize.define('drones', {
    drone_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true, // not sure if we should autoincrement (we only have 4 fixed drones)
      primaryKey: true
    },
    drone_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    location_lat: {
      type: Sequelize.FLOAT, // 8 decimal points from DroneAPI
      allowNull: false
    },
    location_lng: {
      type: Sequelize.FLOAT, // 8 decimal points from DroneAPI
      allowNull: false
    },
    battery_capacity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    battery_charge: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    drone_status: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  return Drone
}

// Sample DroneAPI (get request)

// Curl
// curl -X GET --header 'Accept: application/json' 'http://drones.17-356.isri.cmu.edu/api/drones/21'

// Request URL
// http://drones.17-356.isri.cmu.edu/api/drones/21

// Response Body
//   {
//     "id": 21,
//     "drone_name": "supercharged_warbler",
//     "location": {
//       "lat": 40.44394444,
//       "lng": -79.94444444
//     },
//     "current_delivery": null,
//     "battery": {
//       "capacity": 20000,
//       "charge": 20000
//     }
//   }
