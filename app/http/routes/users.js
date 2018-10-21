import Router from 'router'

const router = Router()

import User from 'controller/Users'
import auth from 'middleware/auth'

router.route('/')
	.get(auth, User.get)
	.post(auth, User.create)

router.route('/:id')
	.get(User.get)
	.post(User.update)
	.delete(User.delete)
	.patch(User.enable)
	.patch(User.disable)

export default router
