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
import i18n from 'i18n'
import locales from 'config/i18n'
import Auth from 'middleware/auth'
import acl from 'library/permissions'
import boom from 'express-boom'
import fileUpload from 'express-fileupload'
import path from 'path'

export default (app) => {

	const logDirectory =  path.join(process.env.APP_PATH, 'logs')

	fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

	app.use(logger('dev'))

	app.use(`/${process.env.APP_STATIC}`, serve(process.env.PWD + "/"+ process.env.APP_STATIC))
	app.use(serve(process.env.PWD + "/"+ process.env.APP_PUBLIC))
	app.use(favicon(process.env.APP_STATIC + '/favicon.png'))

	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(cookieParser())
	app.use(cors({ origin: '*' }))
	app.use(fileUpload({
		safeFileNames: true
	}))

	i18n.configure(locales)

	app.use(i18n.init)

	app.use(boom())

	app.use(Auth.handshake, Auth.authorization)

	app.use('/', routes)

	app.use((req, res, next) => {
		let err = new Error('Not Found')
		err.status = 404
		next(err)
	})

	app.use((error, req, res, next) => {
		res.status(error.status || 500)
		res.render('error', {error, env: process.env.ENV})
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
