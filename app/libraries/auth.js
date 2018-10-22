import moment from 'moment'
import User from 'model/user'
import bcrypt from 'bcrypt'
import app from 'app'

export default class Auth {
	
	static async connect (params, password) {
		
		const err = new Error()
		
		if ('email' in params && password) {
		
			let user = await User.findOne(params).populate('profile')
			let hash = await Auth.hash(password)
			let passwordValid = await Auth.compare(password, user.password)
			
			if (passwordValid) {

				let jwt = app.get('jwt')
				let token = jwt.sign({ sub: user.id }, process.env.APP_SECURE_KEY, { expiresIn: process.env.APP_SECURE_EXPIRATION } )

				user.token = token
				user.lastLogin = new Date()
				user.save()

				user = user.toJSON()

				return { ...user, token }

			}

			err.status = 400
			err.text = 'The email or password doesn\'t match'
			throw err
		}
	}

	static async verify (token) {
		
		let jwt = app.get('jwt')

		if (token) {
			let payload = await jwt.verify(token, process.env.APP_SECURE_KEY)
			return payload
		}
		
		err.status = 400
		err.text = 'Token is not valid or was expirated'
		throw err

	}

	static async hash (password) {
		return await bcrypt.hash(password, Number(process.env.APP_SECURE_SALT))
	}

	static async compare (password, hash) {
		return await bcrypt.compare(password, hash)
	}
}


