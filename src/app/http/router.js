import Router from 'router'
import log from 'library/log'

const router = Router()

// Routes
import auth from 'route/auth'

router.get('/', async (req, res) => {
	res.render('index')
})

router.use('/auth', auth)


export default router
