const models = require('../models/models.js')

test('trivial test', () => {
  expect(3).toBe(3)
})

describe('Testing User', () => {
  it('Valid user', () => {
    const result = models.user.validate({
      username: 'benny',
      password: 'abcdefgh',
      first_name: 'Benny',
      last_name: 'Collins',
      user_type: 'customer',
      contact_number: 4124124122,
      email: 'bcollins@gmail.com'
    })
    expect(result.error).toBe(undefined)
  })

  it('Invalid user (invalid user_type)', () => {
    const result = models.user.validate({
      username: 'benny',
      password: 'abcdefgh',
      first_name: 'Benny',
      last_name: 'Collins',
      user_type: 'loyal customer',
      contact_number: 4124124122,
      email: 'bcollins@gmail.com'
    })
    expect(result.error).not.toBe(null)
  })
})

describe('Testing Drone', () => {
  it('Valid Drone', () => {
    const result = models.drone.validate({
      drone_id: 21,
      drone_name: 'drone21',
      location_lat: 12.12345678,
      location_lng: 13.12345678,
      battery_capacity: 500,
      battery_charge: 400,
      drone_status: 'delivering'
    })
    expect(result.error).toBe(undefined)
  })

  it('Invalid drone (invalid drone_status)', () => {
    const result = models.drone.validate({
      drone_id: 21,
      drone_name: 'drone21',
      location_lat: 12.12345678,
      location_lng: 13.12345678,
      battery_capacity: 500,
      battery_charge: 400,
      drone_status: 'sleep'
    })
    expect(result.error).not.toBe(null)
  })
})

describe('Testing Store', () => {
  it('Valid Store', () => {
    const result = models.store.validate({
      store_id: 'store1',
      street_address: '5000 Forbes Avenue',
      active_products: [12, 34, 13, 33]
    })
    expect(result.error).toBe(undefined)
  })

  it('Invalid store (invalid active_products)', () => {
    const result = models.store.validate({
      store_id: 'store1',
      street_address: '5000 Forbes Avenue',
      active_products: ['Chocolate', 'Hazelnut']
    })
    expect(result.error).not.toBe(null)
  })
})

describe('Testing Product', () => {
  it('Valid product', () => {
    const result = models.product.validate({
      product_id: 123,
      name: 'Hazelnut',
      in_stock: true,
      price: 3.49
    })
    expect(result.error).toBe(undefined)
  })

  it('Invalid product (negative price)', () => {
    const result = models.product.validate({
      product_id: 122,
      name: 'Cheese',
      in_stock: true,
      ingredients: ['Cheese', 'Bread', 'Chocolate'],
      price: -1.00
    })
    expect(result.error).not.toBe(null)
  })

  it('Invalid product (price precision)', () => {
    const result = models.product.validate({
      product_id: 132,
      name: 'Cheese',
      in_stock: true,
      ingredients: ['Cheese', 'Bread', 'Chocolate'],
      price: 1.2
    })
    expect(result.error).not.toBe(null)
  })
})

describe('Testing Order', () => {
  it('Valid Order', () => {
    const result = models.order.validate({
      order_id: 12315,
      payment_status: 'paid',
      date_time_ordered: Date.now(),
      total_cost: 125.00,
      delivery_status: 'delivered',
      order_address: '5000 Forbes Ave'
    })
    expect(result.error).toBe(undefined)
  })

  it('Invalid order (invalid date time ordered)', () => {
    const result = models.order.validate({
      order_id: 12315,
      payment_status: 'paid',
      date_time_ordered: 'Mar 2',
      total_cost: 125.00,
      delivery_status: 'delivered',
      order_address: '5000 Forbes Ave'
    })
    expect(result.error).not.toBe(null)
  })

  it('Invalid order (invalid cost precision)', () => {
    const result = models.order.validate({
      order_id: 12315,
      payment_status: 'paid',
      date_time_ordered: Date.now(),
      total_cost: 125.002,
      delivery_status: 'delivered',
      order_address: '5000 Forbes Ave'
    })
    expect(result.error).not.toBe(null)
  })

  it('Invalid order (invalid payment status)', () => {
    const result = models.order.validate({
      order_id: 12315,
      payment_status: 'no',
      date_time_ordered: Date.now(),
      total_cost: 125.00,
      delivery_status: 'delivered',
      order_address: '5000 Forbes Ave'
    })
    expect(result.error).not.toBe(null)
  })

  it('Invalid order (invalid order_id)', () => {
    const result = models.order.validate({
      order_id: '12315',
      payment_status: 'paid',
      date_time_ordered: Date.now(),
      total_cost: 125.00,
      delivery_status: 'delivered',
      order_address: '5000 Forbes Ave'
    })
    expect(result.error).not.toBe(null)
  })

  it('Invalid order (invalid delivery_status)', () => {
    const result = models.order.validate({
      order_id: 12315,
      payment_status: 'paid',
      date_time_ordered: Date.now(),
      total_cost: 125.00,
      delivery_status: 'not yet',
      order_address: '5000 Forbes Ave'
    })
    expect(result.error).not.toBe(null)
  })
})
