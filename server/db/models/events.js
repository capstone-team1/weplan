const Sequelize = require('sequelize')
const db = require('../db')

const Events = db.define('events', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING
  },
  upvotes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  downvotes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Events
