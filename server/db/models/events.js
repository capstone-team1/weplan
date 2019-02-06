const Sequelize = require('sequelize')
const db = require('../db')

const Events = db.define('events', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  //CG: Possible stretch goal is set up a hook to get actual location from google maps.
  location: {
    type: Sequelize.STRING
  },
  votes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  chosen: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Events
