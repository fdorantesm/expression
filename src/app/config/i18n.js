
import env from 'env'
import path from 'path'

export default {
	locales: ['es', 'en'],
	objectNotation: true,
	directory: path.join(env.APP_PATH, 'locales'),
	api: {
		'__': 'text',
		'__n': 'plural'
	}
}
