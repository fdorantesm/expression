import User from 'model/user'
import Profile from 'model/profile'
import Auth from 'library/auth'
import md5 from 'md5'

export default class Users {

	static async get(req, res) {
			
		let filter = {}
		let user
		const count = 10
		const start = ((req.query.p || 1) -1) * count
		let total = 0

		try {

			const response = {}
			
			if (req.params.id) {
				user = User.findById(req.params.id)
			}

			else {
				if ('q' in req.query) {
					filter = {
						...filter, 
						...{
							$or : [
								{ 'username' : new RegExp(`.*${req.query.q}.*`, 'i') },
								{ 'email' : new RegExp(`.*${req.query.q}.*`, 'i') },
								{ 'profile.name' : new RegExp(`.*${req.query.q}.*`, 'i') }
							]
						}
					}
				}
				

				total = User.length
				
				user = (User
					.find(filter)
					.skip(start)
					.limit(count)
				)
			}

			response.data = await user.populate('Profile')
			
			if (!req.params.id) {
				response.pages = Math.ceil(total / response.data.length)
				response.page = parseInt(req.query.p || 1)
			}
			
			res.send(response)
		}

		catch (e) {
			res.send(e).status(400)
		}
	}

	static async create (req, res) {
		let profile = new Profile({
			name: req.body.name,
			dob: req.body.dob,
			phone: `+52${req.body.phone}`,
			ID: {
				back: process.env.ENV == 'local' ? md5(Date.now() + Math.random()  + process.env.APP_SECURE_KEY) : req.body['ID.back'],
				front: process.env.ENV == 'local' ? md5(Date.now() + Math.random()  + process.env.APP_SECURE_KEY) : req.body['ID.front']
			},
			address: {
				line1: req.body['address.line1'],
				line2: req.body['address.line2'],
				line3: req.body['address.line3'] || null,
				zip: req.body['address.zip']
			}
		})

		let hash = await Auth.hash(req.body.password)

		req.body.password = hash;

		let user = new User({
			...req.body,
			...{
				profile: profile._id
			}
		})
		
		try {
			user = await user.save()
			profile = await profile.save()	
			res.send({
				data: {
					user, profile
				}
			})
		}

		catch (err) {
			res.status(400).send(err)
		}
		
		// let customer = await payment.customer.create({
		// 	name: profile.name,
		// 	email: user.email,
		// 	phone: profile.phone,
		// 	shipping_contacts: [{
		// 		phone: profile.phone,
		// 		receiver: profile.name,
		// 		between_streets: profile.address.line3 || '',
		// 		address: {
		// 			street1: `${profile.address.line1} ${profile.address.line2}`,
		// 			country: "MX",
		// 			postal_code: profile.address.zip
		// 			}
		// 	}]
		// })


		
		// if ('_id' in customer) {
		// 	profile.conekta = customer.toObject().id
		// 	await profile.save()
		// 	return user
		// }


	}

	static async update (req, res) {}

	static async delete (req, res) {}
	
	static async enable (req, res) {}
	
	static async disable (req, res) {}

}
