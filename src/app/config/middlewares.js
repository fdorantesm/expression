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

export default (app) => {

	const logDirectory =  process.env.APP_LOGS

	fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

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
