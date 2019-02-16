import jwt from 'jsonwebtoken'
import middlewares from 'config/middlewares'
import translation from 'config/i18n'
import permissions from 'config/acl'

export default (app) => {

	if (process.env.APP_VIEWS_ENGINE && process.env.APP_VIEWS) {
		app.set('view engine', process.env.APP_VIEWS_ENGINE)
		app.set('views', process.env.APP_VIEWS)
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

	return app
}
