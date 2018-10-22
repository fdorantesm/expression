import Router from 'router'
import log from 'library/log'

const router = Router()

// Routes
import users from 'route/users'
import properties from 'route/properties'
import auth from 'route/auth'

router.use('/users', users)
router.use('/properties', properties)
router.use('/auth', auth)

export default router
