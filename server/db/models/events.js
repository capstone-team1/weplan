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
  //CG: I could agree that votes denormalized is a good idea for loading purposes but don't necessarily thing you should denormalize twice.
  votes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Events
