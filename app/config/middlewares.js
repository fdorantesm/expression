import fs from 'fs'
import rfs from 'rotating-file-stream'
import routes from 'routes'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express from 'express'

export default (app) => {

	const logDirectory =  process.env.APP_LOGS

	fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

	app.use(express.static(process.env.PWD + "/"+ process.env.APP_PUBLIC))
	app.use(favicon(process.env.APP_PUBLIC + '/favicon.png'))

	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(cookieParser())
	app.use(cors({ origin: '*' }))
	
	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
	    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	    next()
	})

	app.use('/', routes)
	
	app.use(function(req, res, next) {
		let err = new Error('Not Found')
		err.status = 404
		next(err)
	})

	app.use(function(err, req, res, next) {
		console.log(err.message)
		res.locals.message = err.message
		res.locals.error = req.app.get('env').ENV === 'local' ? err : {}
		res.status(err.status || 500)
		res.render('error')
	})

	app.use(compression())

	app.use(logger('combined', { 
		stream: rfs(
			'access.log', {
	  			interval: '1d',
	  			path: logDirectory
			}
		)
	}))

	return app

}
