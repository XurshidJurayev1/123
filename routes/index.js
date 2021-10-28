const Router = require('express')
const router = new Router()

const newsRouter = require('./newsRouter')
const vacancyRouter = require('./vacancyRouter')
const contactRouter = require('./contactRouter')

router.use('/news', newsRouter)
router.use('/vacancy', vacancyRouter)
router.use('/contact', contactRouter)


module.exports = router


