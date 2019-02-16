import User from 'model/user'
import Profile from 'model/profile'
import Auth from 'library/auth'
import md5 from 'md5'
import Conekta from 'library/conekta'

export default class Users {

	static async get(req, res) {

		let filter = {}
		let user
		const count = 10
		const start = ((req.query.p || 1) -1) * count
		let total = 0
		const response = {}

		try {

			
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
								{ 'profile.firstName' : new RegExp(`.*${req.query.q}.*`, 'i') },
								{ 'profile.lastName' : new RegExp(`.*${req.query.q}.*`, 'i') }
							]
						}
					}
				}
				

				total = User.length
				
				user = User.paginate(filter, {
					page: parseInt(req.query.page) || 1,
					limit: 5,
					populate: 'profile'
				})
			}

			response.data = await user

			if (!req.params.id) {
				response.pages = Math.ceil(total / response.data.length)
				response.page = parseInt(req.query.p || 1)
			}
			
			res.send({data: response.data})
		}

		catch (e) {
			res.send({e}).status(400)
		}
	}

	static async create (req, res) {
		let profile = new Profile({
			firstName: req.body.first_name,
			lastName: req.body.last_name,
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

			const Customer = new Conekta.Customer()
			const fullname = `${req.body.first_name} ${req.body.last_name}`
			Customer.name = fullname
			Customer.email = req.body.email
			Customer.phone = `+52${req.body.phone}`
			Customer.contacts = [{
				phone: `+52${req.body.phone}`,
				receiver: fullname,
				between_streets: req.body['address.line3'],
				address: {
					street1: `${req.body['address.line1']} ${req.body['address.line2']}`,
					country: "MX",
					postal_code: req.body['address.zip']
					
				}
			}]

			let conekta = await Customer.save()
			await Profile.updateOne({_id:profile.id}, {conekta: conekta._id})
			profile.conekta = conekta._id
			
			res.send({
				data: {
					user, profile
				}
			})
		}

		catch (err) {
			res.status(400).send(err)
		}

	}

	static async update (req, res) {}

	static async delete (req, res) {}
	
	static async enable (req, res) {}
	
	static async disable (req, res) {}

}
