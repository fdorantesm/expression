import Router from 'router'

const router = Router()

import User from 'controller/Users'
import Auth from 'middleware/auth'

router.route('/')
	.get(Auth.api, User.get)
	.post(Auth.api, User.create)

router.route('/:id')
	.get(User.get)
	.post(User.update)
	.delete(User.delete)
	.patch(User.enable)
	.patch(User.disable)

export default router
