import Property from 'model/property'
import { Types } from 'mongoose'
import { isArray } from 'lodash'

export default class Properties {

	static async get (req, res) {
		
		let handler
		let filter = {}
		let totalProperties = 0
		let response = {}
		const paginate = {}
		
		if ('id' in req.params) {
			handler = Property.findById(req.params.id)
		}

		else {
			paginate.count = 10
			paginate.start = ((req.query.page || 1) -1) * paginate.count

			if('category' in req.query) {
				filter.category = req.query.category
			}

			if ('keyword' in req.query) {
				const or = {
					$or : [
						{ 'title' : new RegExp(`.*${req.query.keyword}.*`, 'i') },
						{ 'description' : new RegExp(`.*${req.query.keyword}.*`, 'i') }
					]
				}
				filter = {...filter, ...or}
			}

			if('owner' in req.query) {
				filter.owner = req.query.owner
			}

			handler = Property.find(filter)

			totalProperties = handler.lenth
			
			if (paginate) {
				handler
					.skip(paginate.start)
					.limit(paginate.count)
			}

		}

		try {
			let result = await handler.where({...filter, ...{ deleted:false }})
			.populate([
				{
					path: 'owner',
					model: 'User',
					populate: [
						{
							path: 'profile',
							model: 'Profile',
							populate: [
								{ path: 'address.country', model: 'Country' },
								{ path: 'address.region', model: 'Region' },
								{ path: 'address.city', model: 'City' }
							]
						}
					]
				},
				'address.country',
				'address.region',
				'address.city',
				'amenities',
				'category',
				'files'
			])

			if (!result) {
				const err = new Error('Not Found')
				err.message = 'Not Found'
				err.status = 404
				throw err
			}

			if (req.params.id) {
				let prev = await Properties.near(result._id, 'prev')
				let next = await Properties.near(result._id, 'next')
				let prop = result.toJSON()
				response = { ...prop }
				response.prev = prev
				response.next = next
			}

			else {
				response = {
					total: totalProperties,
					perPage: paginate.count,
					page: parseInt(req.query.page || 1),
					properties: result
				}
			}

			res.send(response)
			
		}

		catch (err) {
			res.status(err.status || 400).send(err)
		}
	}

	static async create (req, res) {
		
		console.log(req)

		const params = {}
		
		params.title = req.body.title
		params.description = req.body.description
		params.files = req.body.files
		params.category = req.body.category
		params.cert = req.body.cert
		params.amenities = req.body.amenities

		params.address = {}
		params.address.line1 = req.body.address.line1
		params.address.line2 = req.body.address.line2
		params.address.line3 = req.body.address.line3
		params.address.zip = req.body.address.zip
		params.address.country = req.body.address.country
		params.address.region = req.body.address.region
		params.address.city = req.body.address.city

		params.address.location = {}
		params.address.location.lat = req.body.address.location.lat
		params.address.location.lon = req.body.address.location.lon
		
		params.cost = req.body.cost
		params.owner = req.body.owner
		params.maintenance = req.body.maintenance
		params.contract = req.body.contract
		params.access = req.body.access
		params.status = req.body.status
		params.options = req.body.options

		try {
			const property = await new Property(params).save()
			res.send({property})
		}

		catch (err) {
			res.status(err.status || 400).send(err)
		}

	}

	static async update (req, res) {
		try {
			let property = await Property.updateOne({_id: req.params.id}, req.body)
			res.send(null)
		}
		catch (err) {
			res.status(err.status || 400).send(err)
		}
	}
	
	static async delete (req, res) {
		try {
			let property = await Property.findById(req.params.id)
			if (!property.deleted) {
				property.softdelete()
				res.send(null)
			}
			else {
				res.status(404).send(null)
			}
		}
		catch (err) {
			res.status(err.status || 400).send(err)
		} 
	}

	static async restore (req, res) {
		try {
			const property = await Property.findById(req.params.id)
			if (property.deleted) {
				property.restore()
				res.send(null)
			}
			else {
				res.status(404).send(null)
			}			
		}
		catch (err) {
			res.status(err.status || 400).send(err)
		}
	}

	static async near (id, type) {
		const $near = type === 'next' ? "$gt" : "$lt"
		const filter = { _id: {} }
		filter._id[$near] = Types.ObjectId(id)
		return await Property
			.findOne(filter, {
				requests: false,
				reviews: false,
				options: false,
				owner: false,
				files: false,
				rates: false,
				cert: false
			})
			.where({
				deleted: false
			})
	}

}
