// 'use strict'

// let { model } = require('asapp')
// let Property = model('property')
// let User = model('user')

// exports.isOwner = async (req, res, next) => {
// 	if (req.params.id) {
// 		try {
// 			let property = await Property.findById(req.params.id)
// 			if (req.token.sub === property.owner.toString()) {
// 				next()

// 			}
// 			else {
// 				const err = new Error()
// 				err.status = 401
// 				err.text = 'Only property\'s owner can make this action'
// 				throw err
// 			}
// 		}

// 		catch (err) {
// 			res.status(err.status || 401).send(err)
// 		}
// 	}
// }

// exports.isApplicantable = async (req, res, next) => {
// 	let params = { ...req.params, ...req.body }
// 	if ('token' in req && 'id' in params) {
// 		try {
			
// 			let property = await Property.findById(params.id).populate({
// 				path: 'requests',
// 				model: 'Request'
// 			})

// 			let applicant = await User.findById(req.token.sub)

// 			let applicants = property.requests.map((request) => {
// 				return request.applicant.toString()
// 			})
			
// 			if (!property || !applicant) {
// 				const err = new Error()
// 				err.status = 400
// 				err.text = 'Not Found'
// 				throw err
// 			}

// 			if (property.owner == req.token.sub) {
// 				res.status(400).send({
// 					status: 400,
// 					text: 'Misma persona'
// 				})
// 			}
			
// 			else if (property.status === -1) {
// 				res.status(400).send({
// 					status: 400,
// 					text: 'Propiedad eliminada'
// 				})
// 			}

// 			else if (property.status < 2) {
// 				res.status(400).send({
// 					status: 400,
// 					text: 'Propiedad no disponible'
// 				})	
// 			}

// 			else if (applicants.indexOf(req.token.sub) > -1) {
// 				res.status(400).send({
// 					status: 400,
// 					text: 'Ya envió solicitud'
// 				})
// 			}
			
// 			else {
// 				next()
// 			}
// 		}

// 		catch (err) {
// 			res.status(err.status).send(err)
// 		}
		

// 	}
	
// }
