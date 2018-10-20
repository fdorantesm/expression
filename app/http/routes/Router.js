import express from 'express'

import Test from 'route/Test'
import Users from 'route/Users'

const Router = express.Router()

Router.get('/', (req, res) => {
	const data = {
		title: process.env.APP_NAME
	}
	res.render('index', data)
})

Router.use('/test', Test)
Router.use('/users', Users)

export default Router
