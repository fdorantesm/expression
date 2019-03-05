import middlewares from 'core/middlewares'
import routes from 'core/routes'
import permissions from 'config/acl'
import path from 'path'
import fs from 'fs'

export default (app) => {

	if (process.env.APP_VIEWS_ENGINE) {
		const views = path.join(process.env.APP_PATH, 'views')
		fs.existsSync(views) || fs.mkdirSync(views)
		app.set('view engine', process.env.APP_VIEWS_ENGINE)
		app.set('views', path.join(process.env.APP_PATH, 'views'))
	}
	
	app.set('env', process.env)
	app.set('secret', process.env.APP_SECURE_KEY)
	app.set('salt', process.env.APP_SECURE_SALT)
	app.set("x-powered-by", process.env.APP_EXPOSE)
	app.set('token_expires', process.env.APP_SECURE_EXPIRATION)

	switch (process.env.ENV) {
		case 'local':
			
		break;
		
		case 'test':
			
		break;

		case 'production':
			
		break;

	}

	permissions()
	
	middlewares(app)

	routes(app)

	app.use((req, res, next) => {
        let err = new Error('Not Found')
        err.status = 404
        next(err)
    })

    app.use((error, req, res, next) => {
        res.status(error.status || 500)
        res.render('error', {error, env: process.env.ENV})
    })

	return app
}
