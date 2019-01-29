const Sequelize = require('sequelize')
const db = require('../db')

const Group = db.define('group', {
  //CG: Stronger validations here. notEmpty, etc.
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
  }
})

module.exports = Group
