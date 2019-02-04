const Sequelize = require('sequelize')
const db = require('../db')

const UserEvent = db.define('user_events', {
  vote: {
    type: Sequelize.ENUM('DOWN', 'NEUTRAL', 'UP'),
    defaultValue: 'NEUTRAL'
  }
})

module.exports = UserEvent
