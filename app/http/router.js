import Router from 'router'

const router = Router()

import log from 'library/log'

import home from 'route/home'
import test from 'route/test'
import users from 'route/users'

router.use('/users', users)
router.use('/', home)
router.use('/test', test)

export default router
