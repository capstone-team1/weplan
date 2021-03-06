const User = require('./user')
const Group = require('./groups')
const Events = require('./events')
const UserEvent = require('./userEvents')
const db = require('../db')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.belongsToMany(Group, {through: 'user_group'}) //users_groups
Group.belongsToMany(User, {through: 'user_group'}) //memberships

User.belongsToMany(Events, {through: UserEvent})
Events.belongsToMany(User, {through: UserEvent})

Events.belongsTo(Group)
Group.hasMany(Events)

const UserGroup = db.model('user_group')

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Group,
  Events,
  UserEvent,
  UserGroup
}
