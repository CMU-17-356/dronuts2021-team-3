const request = require('supertest')
const app = require('../app')
const db = require('../models')


beforeAll(done => {
  done()
})



describe('Create an employee user if test_user is not created yet, otherwise login', () => {
  it('should create a new employee', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'test_employee3',
        password: '123456789a'
      })
    if (res.statusCode !== 200) {
      const res2 = await request(app)
        .post('/auth/register')
        .send({
          username: 'test_employee3',
          password: '123456789a',
          first_name: 'tester',
          last_name: 'tested',
          user_type: 'employee',
          email: 'employee@xyz.com'
        })
      expect(res2.statusCode).toBe(200)
      expect(res2.body).toHaveProperty('token')
      expect(res2.body).toHaveProperty('message', 'User was registered.')
    } else {
      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty('token')
      expect(res.body).toHaveProperty('user_type', 'employee')
      expect(res.body).toHaveProperty('username', 'test_employee3')
    }
  })
})

describe('Testing of getalldrones', () => {
  it('get all drones should work', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'test_employee3',
        password: '123456789a'
      })
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token')
    expect(res.body).toHaveProperty('user_type', 'employee')
    expect(res.body).toHaveProperty('username', 'test_employee3')
    const token2 = res.body.token

    const res2 = await request(app)
      .post('/employee/getalldrones')
      .send({
        token: token2
      })
    expect(res2.statusCode).toBe(200)
    expect(res2.body).toHaveProperty('drones')
    for (const element of res2.body.drones) {
      expect(element).toHaveProperty('id')
      expect(element).toHaveProperty('drone_name')
      expect(element).toHaveProperty('location')
      expect(element.location).toHaveProperty('lat')
      expect(element.location).toHaveProperty('lng')
      expect(element).toHaveProperty('current_delivery')
      if (element.current_delivery != null) {
        expect(element.current_delivery).toHaveProperty('destination')
        expect(element.current_delivery.destination).toHaveProperty('lat')
        expect(element.current_delivery.destination).toHaveProperty('lng')
        expect(element.current_delivery).toHaveProperty('status')
        expect(element.current_delivery).toHaveProperty('route')
        expect(element.current_delivery.route).toHaveProperty('time_start')
        expect(element.current_delivery.route).toHaveProperty('time_arrive')
        expect(element.current_delivery.route).toHaveProperty('time_return')
      }
      expect(element).toHaveProperty('battery')
      expect(element.battery).toHaveProperty('capacity')
      expect(element.battery).toHaveProperty('charge')
    }
  })
})

describe('Testing of employee functionalities', () => {
  it('get pendingorders and completeorder should work', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'test_employee3',
        password: '123456789a'
      })
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token')
    expect(res.body).toHaveProperty('user_type', 'employee')
    expect(res.body).toHaveProperty('username', 'test_employee3')
    const token2 = res.body.token

    const res2 = await request(app)
      .post('/employee/getpendingorders')
      .send({
        token: token2
      })
    expect(res2.statusCode).toBe(200)
    expect(res2.body).toHaveProperty('order')
    let orderidLast = 1
    for (const element of res2.body.order) {
      expect(element).toHaveProperty('order_id')
      orderidLast = element.order_id
      expect(element).toHaveProperty('payment_status', 'paid')
      expect(element).toHaveProperty('total_cost')
      expect(element).toHaveProperty('delivery_status', 'preparing')
      expect(element).toHaveProperty('username')
      expect(element).toHaveProperty('products')
    }

    const res3 = await request(app)
      .post('/employee/completeorder')
      .send({
        token: token2,
        order_id: orderidLast
      })
    expect(res3.statusCode).toBe(200)
    expect(res3.body).toHaveProperty('message', 'Order marked as ready for delivery.')

    const res4 = await request(app)
      .post('/employee/getpendingorders')
      .send({
        token: token2
      })
    expect(res4.statusCode).toBe(200)
    expect(res4.body).toHaveProperty('order')
    for (const element of res4.body.order) {
      expect(element).toHaveProperty('order_id')
      expect(element.order_id).not.toBe(orderidLast)
    }
  })
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  db.sequelize.close()
  done()
})