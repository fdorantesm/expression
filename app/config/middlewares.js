import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import favicon from 'serve-favicon'
import fs from 'fs'
import logger from 'morgan'
import rfs from 'rotating-file-stream'
import routes from 'routes'
import serve from 'serve-static'

export default (app) => {

	const logDirectory =  process.env.APP_LOGS

	fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

	app.use(`/${process.env.APP_STATIC}`, serve(process.env.PWD + "/"+ process.env.APP_STATIC))
	app.use(serve(process.env.PWD + "/"+ process.env.APP_PUBLIC))
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
	
	app.use((req, res, next) => {
		let err = new Error('Not Found')
		err.status = 404
		next(err)
	})

	app.use((err, req, res, next) => {
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
