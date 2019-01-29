const Sequelize = require('sequelize')
const db = require('../db')

const Group = db.define('group', {
  //CG: Stronger validations here. notEmpty, etc.
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  chatId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Group
