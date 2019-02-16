import Router from 'router'
import log from 'library/log'

const router = Router()

// Routes
import users from 'route/users'
import properties from 'route/properties'
import auth from 'route/auth'
import conekta from 'route/conekta'
import catalogs from 'route/catalogs'

router.get('/', async (req, res) => {
	res.render('index')
})

router.get('/cards', (req, res) => res.render('cards'))

router.use('/users', users)
router.use('/properties', properties)
router.use('/auth', auth)
router.use('/pay', conekta)
router.use('/catalogs', catalogs)

export default router
