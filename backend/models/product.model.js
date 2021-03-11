module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('products', {
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    in_stock: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false
    }
  })

  return Product
}
