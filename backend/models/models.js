const Joi = require('joi')

const user = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  user_type: Joi.string().required().valid('employee', 'customer'),
  contact_number: Joi.number().integer(),
  email: Joi.string()
})

const drone = Joi.object({
  drone_id: Joi.number().integer().required(),
  drone_name: Joi.string().required(),
  location_lat: Joi.number().precision(8).required(),
  location_lng: Joi.number().precision(8).required(),
  battery_capacity: Joi.number().integer().positive().required(),
  battery_charge: Joi.number().integer().positive().required(),
  drone_status: Joi.string().required().valid('delivering', 'charging', 'returning', 'ready', 'broken')
})

const store = Joi.object({
  store_id: Joi.string().required(),
  street_address: Joi.string().required(),
  active_products: Joi.array().items(Joi.number().integer())
})

const product = Joi.object({
  product_id: Joi.number().integer().required(),
  name: Joi.string().required(),
  in_stock: Joi.boolean().required(),
  price: Joi.number().positive().precision(2).required()
})

const ingredient = Joi.object({
  ingredient_id: Joi.number().integer().required(),
  name: Joi.string().required()
})

const order = Joi.object({
  order_id: Joi.number().integer(),
  payment_status: Joi.string().default('pending').valid('paid', 'pending'),
  date_time_ordered: Joi.date().timestamp('unix'),
  total_cost: Joi.number().min(0).precision(2).default(0),
  delivery_status: Joi.string().default('not paid').valid('delivered', 'not paid', 'preparing', 'ready for delivery', 'delivering', 'failed'),
  order_address: Joi.string().default('')
})

module.exports = {
  user: user,
  drone: drone,
  store: store,
  product: product,
  ingredient: ingredient,
  order: order
}
