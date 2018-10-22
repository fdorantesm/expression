import auth from 'library/auth'
import User from 'model/user'

class Auth {
	
	static async api (req, res, next) {
		try {
			const token = req.headers['authorization'] || req.body.token || req.query.token || null
			const authorized = await auth.verify(token)
			if (authorized) {
				req.user = await User.findOne({token:authorized.token}).populate(['profile', 'role'])
				req.token = authorized.data
				next()
			}
		}
		catch (e) {
			res.status(401).send({
				status: 401,
				text: 'Not authorized'
			})
		}
	}

}

export default Auth 
