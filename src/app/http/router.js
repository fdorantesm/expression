import Router from 'router'

const router = Router()

// Routes
import auth from 'route/auth'
import test from 'route/test'

router.get('/', async (req, res) => {
	res.render('index')
})

router.use('/auth', auth)
router.use('/test', test)


export default router
