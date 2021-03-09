const config = require('../config/db.config.js')

const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    port: config.PORT,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('../models/user.model.js')(sequelize, Sequelize)
db.order = require('../models/order.model.js')(sequelize, Sequelize)
db.product = require('../models/product.model.js')(sequelize, Sequelize)
db.ingredient = require('../models/ingredient.model.js')(sequelize, Sequelize)

db.user.hasMany(db.order, {
  foreignKey: 'order_id'
})
db.order.belongsTo(db.user, {
  foreignKey: 'username'
})

db.orderproduct = sequelize.define('OrderProduct')
db.order.belongsToMany(db.product, {
  foreignKey: 'product_id',
  through: 'OrderProduct'
})
db.product.belongsToMany(db.order, {
  foreignKey: 'order_id',
  through: 'OrderProduct'
})

db.product.belongsToMany(db.ingredient, {
  foreignKey: 'ingredient_id',
  through: 'ProductIngredient'
})
db.ingredient.belongsToMany(db.product, {
  foreignKey: 'product_id',
  through: 'ProductIngredient'
})

db.ROLES = ['employee', 'customer']

module.exports = db
