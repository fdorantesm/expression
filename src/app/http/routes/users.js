import Router from 'router'

const router = Router()

import UsersController from 'controller/Users'
import Auth from 'middleware/auth'

import {
	fetchAllUsers, 
	createUser, 
	editUser, 
	deleteUser 
} from 'middleware/users'

router.route('/')
	.get(Auth.authenticated, fetchAllUsers, UsersController.get)
	.post(Auth.authenticated, createUser, UsersController.create)

router.route('/:id')
	.get(UsersController.get)
	.post(editUser, UsersController.update)
	.delete(deleteUser, UsersController.delete)
	.patch(UsersController.enable)
	.patch(UsersController.disable)

export default router
