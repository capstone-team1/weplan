const router = require('express').Router()
const {User, Group, Events, UserEvent} = require('../db/models')
const Op = require('sequelize').Op
const nodemailer = require('nodemailer')

//NodeMailer using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'WePlanFSA@gmail.com',
    pass: 'weplan123'
  }
})

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allUsers = await User.findAll({
      include: [{model: Group}]
    })

    res.json(allUsers)
  } catch (err) {
    next(err)
  }
})

//Get user info
router.get('/:userId', async (req, res, next) => {
  try {
    if (req.user === req.params.userId) {
      let id = req.params.userId
      //CG: Any logged in user can view any user.
      const users = await User.findById(id, {
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['handle', 'email'],
        include: [
          {
            model: Group,
            include: Events
          }
        ]
      })
      res.json(users)
    }
  } catch (err) {
    next(err)
  }
})

//Get groups a user is a member of
router.get('/:userId/groups', async (req, res, next) => {
  try {
    if (req.user) {
      let id = req.params.userId
      let user = await User.findById(id)
      let curGroups = await user.getGroups()
      res.json(curGroups)
    }
  } catch (err) {
    next(err)
  }
})

//User creates group
router.post('/:userId/groups', async (req, res, next) => {
  if (req.user && req.user.id === Number(req.params.userId)) {
    try {
      const {name, description} = req.body
      const newGroup = await Group.create({
        name,
        description
      })
      const user = await User.findById(Number(req.params.userId))

      await user.addGroup(newGroup)
      res.json(newGroup)
    } catch (err) {
      next(err)
    }
  }
})

//Single group
router.get('/:userId/groups/:groupId', async (req, res, next) => {
  if (req.user && req.user.id === Number(req.params.userId)) {
    try {
      const result = await Group.findById(req.params.groupId)
      res.json(result)
    } catch (err) {
      next(err)
    }
  }
})

//All events of a single group
router.get('/:userId/groups/:groupId/events', async (req, res, next) => {
  try {
    let id = req.params.groupId
    const events = await Events.findAll({where: {groupId: id}})
    res.json(events)
  } catch (err) {
    next(err)
  }
})

//Creating event
router.post('/:userId/groups/:groupId/events', async (req, res, next) => {
  try {
    let id = Number(req.params.groupId)
    const event = await Events.create({
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      groupId: id
    })
    const allGroupUsers = await Group.findAll({
      where: {id: id},
      include: {model: User}
    })
    event.addUser(allGroupUsers[0].users)
    res.json(event)
  } catch (err) {
    next(err)
  }
})

//get all events for a user?
router.get('/:userId/events/:eventId', async (req, res, next) => {
  try {
    const event = await Events.findById(req.params.eventId)
    res.json(event)
  } catch (err) {
    next(err)
  }
})

//UPVOTE AND DOWNVOTE ROUTE
router.put('/events/:eventId/vote', async (req, res, next) => {
  try {
    //  find through table instance
    const currentVote = await UserEvent.findAll({
      where: {userId: req.user.id, eventId: Number(req.params.eventId)}
    })

    if (currentVote[0].vote === 'NEUTRAL') {
      await currentVote[0].update({vote: 'UP'})

      const currentEventCount = await Events.findById(
        Number(req.params.eventId)
      )

      const updateEventcount = await currentEventCount.increment('votes', {
        by: 1
      })
      res.json(updateEventcount)
    } else if (currentVote[0].vote === 'UP') {
      await currentVote[0].update({vote: 'NEUTRAL'})
      const currentEventCount = await Events.findById(
        Number(req.params.eventId)
      )

      const updateCurrentEvent = await currentEventCount.decrement('votes', {
        by: 1
      })
      res.json(updateCurrentEvent)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/events', async (req, res, next) => {
  try {
    if (req.user) {
      const newEvent = await Events.create({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location
      })
      res.json(newEvent)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId/events/:eventId', async (req, res, next) => {
  try {
    if (req.user) {
      const deletedEvent = await Events.destroy({
        where: {
          id: req.params.eventId
        }
      })
      deletedEvent
        ? res.send('you have deleted successfully')
        : res.send('this has already been deleted in the past')
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId/groups/:groupId', async (req, res, next) => {
  try {
    let curGroup = await Group.findById(req.params.groupId)
    await curGroup.destroy()
    res.send(curGroup)
  } catch (err) {
    next(err)
  }
})

//route for Join Group button on the front end. this route associates a user to a group
router.put('/:userId/groups/:groupId', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)
    const groupId = Number(req.params.groupId)

    const currentGroup = await Group.findById(groupId)
    const currentUser = await User.findById(userId)

    await currentGroup.addUser(currentUser)

    const allEventsForGroup = await Events.findAll({where: {groupId: groupId}})
    currentUser.addEvents(allEventsForGroup)

    res.send('User has joined the group successfully!')
  } catch (err) {
    next(err)
  }
})

//Decides the event (time out currently used in front end)
router.put('/:groupId/decideEvent', async (req, res, next) => {
  const groupId = Number(req.params.groupId)
  try {
    const topVotesNum = await Events.max('votes', {
      where: {groupId: groupId}
    })

    const bestEvent = await Events.findAll({
      where: {
        groupId: groupId,
        votes: topVotesNum
      }
    })

    bestEvent[0].update({
      chosen: true
    })

    await Events.destroy({
      where: {
        id: {[Op.ne]: bestEvent[0].id}
      }
    })

    //NodeMailer
    const members = await Group.findAll({
      where: {id: groupId},
      include: {model: User, attributes: ['email']}
    })
    members[0].users.forEach(user =>
      transporter.sendMail(
        {
          from: 'WePlan@gmail.com',
          to: user.email,
          subject: 'An event has been selected!',
          html: '<p>Hello there! Your groups event has been planned!</p>'
        },
        function(err, info) {
          if (err) console.log(err)
          else console.log(info)
        }
      )
    )

    res.json(bestEvent)
  } catch (err) {
    next(err)
  }
})

router.get('/groups/join', async (req, res, next) => {
  try {
    const joinGroups = await Group.findAll({
      include: [
        {
          model: User,
          where: {
            id: {
              $ne: req.user.id
            }
          }
        }
      ]
    })
    res.json(joinGroups)
  } catch (err) {
    next(err)
  }
})
