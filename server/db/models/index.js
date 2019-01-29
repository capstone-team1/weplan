const User = require('./user')
const Group = require('./groups')
const Events = require('./events')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Group)
User.belongsToMany(Group, {through: 'userGroup'})
Group.belongsToMany(User, {through: 'userGroup'})

Events.belongsTo(Group)
Group.hasMany(Events)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Group,
  Events
}
