import auth from 'library/auth'
import app from 'app'
import User from 'model/user'
import Profile from 'model/profile'
import Conekta from 'library/conekta'
import {sockets} from 'server'
import request from 'request-promise'
import md5 from 'md5'
import {createCustomer} from 'helper/users'

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
		let user = null
		let profile = null
		request(`https://graph.facebook.com/v3.2/me?access_token=${req.body.authResponse.accessToken}&fields=email,gender,birthday,first_name,last_name`)
			.then(async body => {
				const data = JSON.parse(body)
				if (data.id === req.body.id && data.id == req.body.authResponse.userID) {
					let email = data.email
					
					profile = await Profile.findOne({social: { facebook: data.id }})

					if (!profile) {
						const userFields = {}
						userFields.firstName = data.first_name
						userFields.lastName = data.last_name
						userFields.social = { facebook: data.id }
						userFields.nickname = md5(data.id + Date.now())
						userFields.password = await auth.hash(md5(data.id))

						if (data.email) {
							userFields.email = data.email
						}

						if (data.gender) {
							userFields.gender = data.gender
						}

						if (data.birthday) {
							userFields.dob = Date(data.birthday)
						}


						const customer = await createCustomer(userFields)

						user = customer.user
						profile = customer.profile

					}

					user = await User.findOne({ profile: profile.id }).populate('profile')
					const token = await auth.social(user.id)
					result = {...user.toObject(), token}
					res.send(result)
				}
				
			})
			
			.catch(err => {
				res.boom.unauthorized(err.message)
			})
	}

	static async google(req, res) {
		let data = null
		let result = null
		let user = null
		let profile = null
		request(`https://www.googleapis.com/userinfo/v2/me?access_token=${req.body.authResponse.access_token}`)
			.then(async body => {
				const data = JSON.parse(body)

				if (data.id === req.body.id && data.id == req.body.id && req.body.email === data.email) {
					let email = data.email

					profile = await Profile.findOne({social: { google: data.id }})

					if (!profile) {
						const customer = await createCustomer({
							firstName: data.given_name,
							lastName: data.family_name,
							social: {
								google: data.id
							},
							email: data.email,
							nickname: md5(data.email + Date.now()),
							password: await auth.hash(md5(data.id)),
						})

						user = customer.user
						profile = customer.profile
					}


					user = await User.findOne({ profile: profile.id }).populate('profile')
					const token = await auth.social(user.id)
					result = {...user.toObject(), token}
					res.send(result)
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

			res.send({})
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
