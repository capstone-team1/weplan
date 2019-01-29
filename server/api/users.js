const router = require('express').Router()
const {User, Group, Events, userGroup} = require('../db/models')
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
    if (req.user) {
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
      let curGroups = await Group.findAll({
        where: {
          userId: id
        }
      })
      res.json(curGroups)
    }
  } catch (err) {
    next(err)
  }
})

//CG: Definitely /groups/:groupId/events
//CG: This should at least just say events . 
// /groups/:groupId/events/create FRONT END ONLY
router.post('/:userId/createEvent', async (req, res, next) => {
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
