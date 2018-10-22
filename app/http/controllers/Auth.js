import auth from 'library/auth'
import app from 'app'
import User from 'model/user'

export default class Auth {

	static async login (req, res) {
		try {
			
			if (req.body.email && req.body.password) {
				const login = await auth.connect({ email: req.body.email }, req.body.password)
			
				if (login) {
					res.send(login)
				}
			
			}
			
			else {
				let err = new Error()
				err.status = 400
				err.message = 'The email and password fields are required'
				throw err
			}
		}
		
		catch(err){
			res.status(err.status || 400).send(err)
		}
	}

	static async verify () {}

	static async recover () {}
	
	static async disable () {}
	
	static async enable () {}

	static async whoami (req, res) {
		
		try {
			
			const user = req.user
			
			if (user.id) {
				res.send(user)
			}

			else {
				let err = new Error
				err.status = 403
				err.message = "Forbidden"
			}

		}

		catch (err) {
			res.status(err.status).send(err)
		}

	}

}
