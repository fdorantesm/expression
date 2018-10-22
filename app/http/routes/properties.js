import Router from 'router'
import properties from 'controller/Properties'

const router = Router()

router.route('/')
	.get(properties.get)
	.post(properties.create)

router.route('/:id')
	.get(properties.get)
	.post(properties.update)
	.patch(properties.restore)
	.delete(properties.delete)

export default router
