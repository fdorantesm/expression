import Router from 'router'
import PropertiesController from 'controller/Properties'

const router = Router()

router.route('/')
	.get(PropertiesController.get)
	.post(PropertiesController.create)

router.route('/:id')
	.get(PropertiesController.get)
	.post(PropertiesController.update)
	.patch(PropertiesController.restore)
	.delete(PropertiesController.delete)

export default router
