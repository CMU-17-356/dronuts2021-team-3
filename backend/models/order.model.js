module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define('orders', {
    order_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    payment_status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'pending'
    },
    date_time_ordered: {
      type: Sequelize.DATE,
      allowNull: true
    },
    total_cost: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    delivery_status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'not paid'
    },
    order_address: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    }
  })

  return Order
}
