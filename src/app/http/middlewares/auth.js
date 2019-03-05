import auth from 'library/auth'
import spatie from "helper/spatie"

class Auth {

	static async handshake (req, res, next) {
		const token = req.headers['authorization'] || req.body.token || req.query.token || null
		if (token) req.authorization = token
		next()
	}

	static async authorization (req, res, next) {
		
		try {
			const authorized = await auth.verify(req.authorization)
			// if (authorized) {
			// 	req.user = await User.findOne({ token: req.authorization }).populate(['role'])
			// 	spatie.addUserRoles(req.user.id, req.user.role.name)
			// 	req.permissions = await spatie.permissions(req.user.id)
			// 	req.token = authorized.data
			// 	req.session = {
			// 		userId: req.user.id
			// 	}
			// 	// req.acl = {
			// 	// 	user: req.user.id,
			// 	// 	role: req.user.role.name,
			// 	// 	level: req.user.role.level || 0,
			// 	// 	perms: req.permissions
			// 	// }
			// }
		}
		
		catch (e) {
			req.acl = {
				role: 'guest'
			}
		}

		finally {
			next()
		}

	}
	
	static async authenticated (req, res, next) {

		try {
		
			if (req.user) {
				next()
			}
		
			else {
				throw new Error()
			}
		
		}
		
		catch (err) {
			res.boom.unauthorized()
		}

	}

}

export default Auth 
