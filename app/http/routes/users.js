import Router from 'router'

const router = Router()

import User from 'controller/Users'
import Auth from 'middleware/auth'
import {
	fetchAllUsers, 
	createUser, 
	editUser, 
	deleteUser 
} from 'middleware/users'

router.route('/')
	.get(Auth.authenticated, fetchAllUsers, User.get)
	.post(Auth.authenticated, createUser, User.create)

router.route('/:id')
	.get(User.get)
	.post(editUser, User.update)
	.delete(deleteUser, User.delete)
	.patch(User.enable)
	.patch(User.disable)

export default router
