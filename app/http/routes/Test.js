import express from 'express'

let Router = express.Router()

Router.get('/', (req, res) => {
	res.send('hola mundo')
})

export default Router
