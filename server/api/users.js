const router = require('express').Router()
const {User, Group, Events} = require('../db/models')
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

router.get('/:userId/groups/:groupId/events', async (req, res, next) => {
  try {
    console.log(req.params.groupId)
    const events = await Events.findAll({where: {groupId: req.params.groupId}})
    res.json(events)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/events/:eventId', async (req, res, next) => {
  try {
    const event = await Events.findById(req.params.eventId)
    res.json(event)
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
