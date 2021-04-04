const request = require('supertest')
const app = require('../app')
const db = require('../models')

beforeAll(done => {
  done()
})





describe('Create a user if test_user is not created yet, otherwise login', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'test_customer3',
        password: '123456789a'
      })
    if (res.statusCode !== 200) {
      const res2 = await request(app)
        .post('/auth/register')
        .send({
          username: 'test_customer3',
          password: '123456789a',
          first_name: 'test1',
          last_name: 'test2',
          user_type: 'customer',
          email: 'abc@xyz.com'
        })
      expect(res2.statusCode).toBe(200)
      expect(res2.body).toHaveProperty('token')
      expect(res2.body).toHaveProperty('message', 'User was registered.')
    } else {
      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty('token')
      expect(res.body).toHaveProperty('user_type', 'customer')
      expect(res.body).toHaveProperty('username', 'test_customer3')
    }
  })
})

describe('Test getuser route', () => {
  it('getuser should work after login', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'test_customer3',
        password: '123456789a'
      })
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token')
    expect(res.body).toHaveProperty('user_type', 'customer')
    expect(res.body).toHaveProperty('username', 'test_customer3')
    const token1 = res.body.token

    const res2 = await request(app)
      .post('/user/getuser')
      .send({
        token: token1
      })
    expect(res2.statusCode).toBe(200)
    expect(res2.body).toHaveProperty('user')
    expect(res2.body.user).toHaveProperty('username', 'test_customer3')
    expect(res2.body.user).toHaveProperty('email')
    expect(res2.body.user).toHaveProperty('password')
    expect(res2.body.user).toHaveProperty('first_name')
    expect(res2.body.user).toHaveProperty('last_name')
    expect(res2.body.user).toHaveProperty('user_type')
  })
})

describe('Testing of cart, checkout, and view previous order functionalities', () => {
  it('cart, checkout, and view previous orders should work', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'test_customer3',
        password: '123456789a'
      })
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token')
    expect(res.body).toHaveProperty('user_type', 'customer')
    expect(res.body).toHaveProperty('username', 'test_customer3')
    const token2 = res.body.token

    const res2 = await request(app)
      .post('/user/createorder')
      .send({
        token: token2
      })
    expect(res2.statusCode).toBe(200)
    expect(res2.body).toHaveProperty('message', 'Order was created.')

    const res3 = await request(app)
      .post('/user/addtoorder')
      .send({
        token: token2,
        product_id: 1,
        quantity: 2
      })
    expect(res3.statusCode).toBe(200)
    expect(res3.body).toHaveProperty('order')
    expect(res3.body.order).toHaveProperty('order_id')
    expect(res3.body.order).toHaveProperty('payment_status', 'pending')
    expect(res3.body.order).toHaveProperty('total_cost')
    expect(res3.body.order).toHaveProperty('delivery_status', 'not paid')
    expect(res3.body.order).toHaveProperty('username', 'test_customer3')

    const orderid = res3.body.order.order_id

    const res4 = await request(app)
      .post('/user/getcurrentorder')
      .send({
        token: token2
      })
    expect(res4.statusCode).toBe(200)
    expect(res4.body).toHaveProperty('order')
    expect(res4.body.order).toHaveProperty('order_id', orderid)
    expect(res4.body.order).toHaveProperty('payment_status', 'pending')
    expect(res4.body.order).toHaveProperty('total_cost')
    expect(res4.body.order).toHaveProperty('delivery_status', 'not paid')
    expect(res4.body.order).toHaveProperty('username', 'test_customer3')
    expect(res4.body.order).toHaveProperty('products')
    for (const element of res4.body.order.products) {
      expect(element).toHaveProperty('price')
      expect(element).toHaveProperty('product_id')
      expect(element).toHaveProperty('in_stock')
      expect(element).toHaveProperty('name')
      expect(element).toHaveProperty('OrderProduct')
      expect(element.OrderProduct).toHaveProperty('quantity', 2)
      expect(element.OrderProduct).toHaveProperty('product_id', 1)
      expect(element.OrderProduct).toHaveProperty('order_id', orderid)
    }

    const res5 = await request(app)
      .post('/user/addtoorder')
      .send({
        token: token2,
        product_id: 2,
        quantity: 8
      })
    expect(res5.statusCode).toBe(200)
    expect(res5.body).toHaveProperty('order')
    expect(res5.body.order).toHaveProperty('order_id', orderid)
    expect(res5.body.order).toHaveProperty('payment_status', 'pending')
    expect(res5.body.order).toHaveProperty('total_cost')
    expect(res5.body.order).toHaveProperty('delivery_status', 'not paid')
    expect(res5.body.order).toHaveProperty('username', 'test_customer3')

    const res6 = await request(app)
      .post('/user/getcurrentorder')
      .send({
        token: token2
      })
    expect(res6.statusCode).toBe(200)
    expect(res6.body).toHaveProperty('order')
    expect(res6.body.order).toHaveProperty('order_id', orderid)
    expect(res6.body.order).toHaveProperty('payment_status', 'pending')
    expect(res6.body.order).toHaveProperty('total_cost')
    expect(res6.body.order).toHaveProperty('delivery_status', 'not paid')
    expect(res6.body.order).toHaveProperty('username', 'test_customer3')
    expect(res6.body.order).toHaveProperty('products')
    for (const element of res6.body.order.products) {
      expect(element).toHaveProperty('price')
      expect(element).toHaveProperty('product_id')
      expect(element).toHaveProperty('in_stock')
      expect(element).toHaveProperty('name')
      expect(element).toHaveProperty('OrderProduct')
      if (element.product_id === 1) {
        expect(element.OrderProduct).toHaveProperty('product_id', 1)
        expect(element.OrderProduct).toHaveProperty('quantity', 2)
      } else {
        expect(element.OrderProduct).toHaveProperty('product_id', 2)
        expect(element.OrderProduct).toHaveProperty('quantity', 8)
      }
    }

    const res7 = await request(app)
      .post('/user/checkout')
      .send({
        token: token2,
        credit_card: '12312412'
      })
    expect(res7.statusCode).toBe(200)
    expect(res7.body).toHaveProperty('message', 'Order completed.')

    const res8 = await request(app)
      .post('/user/getplacedorders')
      .send({
        token: token2
      })
    expect(res8.statusCode).toBe(200)
    expect(res8.body).toHaveProperty('order')
    for (const element of res8.body.order) {
      expect(element).toHaveProperty('order_id')
      expect(element).toHaveProperty('payment_status', 'paid')
      expect(element).toHaveProperty('total_cost')
      expect(element).toHaveProperty('delivery_status')
      expect(element).toHaveProperty('products')
      for (const element2 of element.products) {
        expect(element2).toHaveProperty('product_id')
        expect(element2).toHaveProperty('name')
        expect(element2).toHaveProperty('in_stock')
        expect(element2).toHaveProperty('OrderProduct')
      }
    }
  })
})

describe('Test user/getMenu', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/user/getMenu')
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('product')

    for (const element of response.body.product) {
      expect(element).toHaveProperty('price')
      expect(element).toHaveProperty('product_id')
      expect(element).toHaveProperty('in_stock')
      expect(element).toHaveProperty('name')
    }
  })
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  db.sequelize.close()
  done()
})