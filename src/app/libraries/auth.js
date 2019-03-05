import moment from 'moment'
// import User from 'model/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class Auth {
	
	static async connect (params, password) {
		const err = new Error()		
		return null
	}

	static async social (id) {
		return null
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


