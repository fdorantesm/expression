import auth from 'library/auth'
import app from 'app'
import User from 'model/user'
import Profile from 'model/profile'
import Conekta from 'library/conekta'
import {sockets} from 'server'
import request from 'request-promise'

export default class Auth {

	static async login (req, res) {
			
		if (req.body.email && req.body.password) {
			try {
				const params = { email: req.body.email }
				const token = await auth.connect(params, req.body.password)
				const user = await User.findOne(params).populate('profile')
				res.send({...user.toObject(), token})
			}
			
			catch (err) {
				console.log(err)
				res.boom.badRequest(err.message)
			}
		}
		
		else {
			res.boom.badRequest('Email and password are required fields.')
		}
		
	}

	static async facebook(req, res) {
		let data = null
		let result = null
		request(`https://graph.facebook.com/v3.2/me?access_token=${req.body.authResponse.accessToken}`)
			
			.then(async body => {
				
				const data = JSON.parse(body)

				if (data.id === req.body.id && data.id == req.body.authResponse.userID && req.body.email) {
					let email = req.body.email
					const token = await auth.social(email)
					const user = await User.findOne({email}).populate('profile')
					if (user && token) {
						result = {...user.toObject(), token}
						sockets.wss.emit('logged', result)
						res.send(result)
					}
					else {
						throw new Error("Los datos de acceso no son válidos")
					}
				}
				
			})
			
			.catch(err => {
				res.boom.unauthorized(err.message)
			})
	}

	static async google(req, res) {
		let data = null
		let result = null
		request(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${req.body.authResponse.access_token}`)
			
			.then(async body => {
				
				const data = JSON.parse(body)

				if (data.user_id === req.body.id && data.user_id == req.body.id && req.body.email === data.email) {
					let email = req.body.email
					const token = await auth.social(email)
					const user = await User.findOne({email}).populate('profile')
					if (user && token) {
						result = {...user.toObject(), token}
						sockets.wss.emit('logged', result)
						res.send(result)
					}

					else {
						throw new Error("Los datos de acceso no son válidos")
					}
				}
				
			})
			
			.catch(err => {
				res.boom.unauthorized(err.message)
			})

	}

	static async register (req, res) {
		try {
			
			let profile = new Profile()
			let user = new User()
			
			user.nickname = req.body.email.split('@')[0]
			user.email = req.body.email
			user.password = await auth.hash(req.body.password)
			user.profile = profile.id
			profile.name = req.body.name
			profile.dob = req.body.dob
			profile.phone = `+52${req.body.phone}`
			profile.address = {}
			profile.address.country = req.body.country
			profile.address.region = req.body.region
			profile.address.city = req.body.city

			const customer = await Conekta.Customer.create({
				name: profile.name,
				email: user.email,
				phone: profile.phone
			})

			profile.conekta = customer._id

			user = await user.save()
			profile = await profile.save()

			res.send(null)
		}

		catch (err) {
			res.status(400).send(err)
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
