import Router from 'router'

const router = Router()

router.get('/', (req, res) => {
	res.end('Hola mundo')
})

export default router
