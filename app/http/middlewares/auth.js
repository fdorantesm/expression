import auth from 'library/auth'

export default async (req, res, next) => {
	const token = req.headers['authorization'] || req.body.token || req.query.token || null
	try {
		const authorized = await auth.verify(token)
		if (authorized){
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
