const Sequelize = require('sequelize')
const db = require('../db')

const Group = db.define(
  'group',
  {
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
    linkId: {
      type: Sequelize.STRING
    }
  },
  {
    hooks: {
      beforeCreate: function(group) {
        // can be a single function
        group.linkId = Math.random()
          .toString(36)
          .slice(2)
      }
    }
  }
)

module.exports = Group
