const Sequelize = require('sequelize')
const db = require('../db')

const Group = db.define('group', {
  name: {
    type: Sequelize.STRING,
    unique: true,
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
