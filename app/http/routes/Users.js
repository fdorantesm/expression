import express from 'express'
import UsersController from 'controller/Users'

let Router = express.Router()

Router.route('/')
	.get(UsersController.get)
	.post(UsersController.create)

Router.get('/:id', UsersController.get)

export default Router
