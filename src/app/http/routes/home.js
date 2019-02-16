import Router from 'router'

const router = Router()

router.get('/', (req, res) => {
	const data = {
		title: process.env.APP_NAME
	}
	res.render('index', data)
})

router.get('/me', (req, res) => {
	res.send({name: 'Fer'})
})

export default router
