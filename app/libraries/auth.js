import moment from 'moment'
import User from 'model/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class Auth {
	
	static async connect (params, password) {
		
		const err = new Error()
		
		if ('email' in params && password) {
			
			let user = await User.findOne(params).populate('profile')

			if (!user) {
				err.status = 422
				err.message = 'The email and password doesn\'t match...'
				throw err
			}

			const match = await Auth.compare(password, user.password)
			
			if (match) {
				let token = jwt.sign({ sub: user.id }, process.env.APP_SECURE_KEY, { expiresIn: process.env.APP_SECURE_EXPIRATION } )
				user.token = token
				user.lastLogin = new Date()
				user = await user.save()
				return token
			}
			
			else {
				err.status = 400
				err.message = 'The email and password doesn\'t match'
				throw err
			}
		}
	}

	static async verify (token) {
		
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


