const Joi = require('joi');

const user = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    user_type: Joi.string().required().valid('employee','customer'),
    contact_number: Joi.number().integer(),
    email: Joi.string()
})

const drone = Joi.object({
    drone_id: Joi.string().required(),
    battery_capacity: Joi.number().integer().positive().required(),
    location: Joi.string().required(),
    drone_status: Joi.string().required().valid('delivering','charging','returning','ready','broken'),
    maximum_load: Joi.number().integer().positive().required(),
    current_load: Joi.number().integer().positive().required()
})

const store = Joi.object({
    store_id: Joi.string().required(),
    street_address: Joi.string().required(),
    active_products: Joi.array().items(Joi.number().integer()),
})

const product = Joi.object({
    product_id: Joi.number().integer().required(),
    name: Joi.string().required(),
    in_stock: Joi.boolean().required(),
    ingredients: Joi.array().items(Joi.string()),
    price: Joi.number().positive().precision(2).required()
})

const order = Joi.object({
    order_id: Joi.number().integer().required(),
    payment_status: Joi.string().required().valid('paid','pending'),
    date_time_ordered: Joi.date().timestamp('unix'),
    total_cost: Joi.number().positive().precision(2).required(),
    delivery_status: Joi.string().required().valid('delivered','not paid','delivering','failed'),
    order_address: Joi.string().required()
})


module.exports = {
  user: user,
  drone: drone,
  store: store,
  product: product,
  order: order
};
