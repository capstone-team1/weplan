const router = require('express').Router()
module.exports = router

router.use('/users/groups', require('./groups'))

router.use('/users', require('./users'))
