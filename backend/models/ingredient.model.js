module.exports = (sequelize, Sequelize) => {
  const Ingredient = sequelize.define('ingredients', {
    ingredient_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  return Ingredient
}
