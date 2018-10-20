import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import i18n from 'i18n-2'
import i18nConfig from 'config/i18n'
import compression from 'compression'
import fs from 'fs'
import rfs from 'rotating-file-stream'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import AccessControl from 'accesscontrol'
import dotenv from "dotenv/config"
import mongoose from 'config/mongoose'

export default (app, express) => {
		const logDirectory =  'app/logs'
		app.set('view engine', process.env.APP_VIEWS_ENGINE || 'pug')
		app.set('views', process.env.APP_VIEWS)
		app.set('env', process.env)
		app.set('secret', process.env.APP_SECURE_KEY)
		app.set('salt', process.env.APP_SECURE_SALT)
		app.set("x-powered-by", process.env.APP_EXPOSE)
		app.set('jwt', jwt)
		app.set('token_expires', process.env.APP_SECURE_EXPIRATION)
		// ensure log directory exists
		fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
		// create a rotating write stream
		const accessLogStream = rfs('access.log', {
		  interval: '1d', // rotate daily
		  path: logDirectory
		})
		// setup the logger
		app.use(logger('combined', { stream: accessLogStream }))
		app.use(bodyParser.json())
		app.use(bodyParser.urlencoded({ extended: false }))
		app.use(cookieParser())
		app.use(express.static(process.env.INIT_CWD + "/"+ process.env.APP_PUBLIC))
		// app.use(favicon(process.env.APP_PUBLIC + '/favicon.png'))
		i18n.expressBind(app, i18nConfig)
		app.use(compression())
		app.use(cors({ origin: '*' }))
		mongoose()			
	return app
}
