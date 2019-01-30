const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.send('we have hit the api/groups route. successfully')
})

module.exports = router
