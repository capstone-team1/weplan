const router = require('express').Router()
const {User, Group, Events} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    if (req.user) {
      let id = req.params.id
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
