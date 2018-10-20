import mongoose from 'mongoose'
import mongooseSoftdelete from 'mongoose-softdelete'

const fields = {
	
	title: {
		type: String,
		required: true
	},
	
	description: {
		type: String,
		required: true,
		minLength: 255,
	},
	
	files: [

	],
	
	category: {
		type: mongoose.Types.ObjectId,
		ref: 'Category',
		required: true
	},
	
	cert: {
		type: String,
		required: true,
		unique: true
	},
	
	amenities: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Amenity'
		}
	],
	
	address: {
		line1: {
			type: String,
			required: true
		},
		line2: {
			type: String,
			required: true
		},
		line3: {
			type: String
		},
		zip: {
			type: Number,
			max: 99999,
			min: 1000
		},
		city: {
			type: mongoose.Types.ObjectId,
			ref: 'City'
		},
		region: {
			type: mongoose.Types.ObjectId,
			ref: 'Region'
		},
		country: {
			type: mongoose.Types.ObjectId,
			ref: 'Country'
		},
		location: {
			lat: {
				type: Number,
				required: true
			},
			lon: {
				type: Number,
				required: true
			}
		}

	},
	
	owner: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true
	},
	
	cost: {
		type: Number,
		required: true
	},
	
	maintenance: {
		type: Number,
		required: true,
		default: 0
	},
	
	contract: {
		length:{
			type: Number,
			required: true
		},
		warranty: {
			type: Number,
			required: true
		},
		monthsInAdvance: {
			type: Number,
			required: true
		},
	},
	
	access: {
		type: Number,
		default: 1
	},
	
	status: {
		type: Number,
		default: 1
	},
	
	options: Object,
	
	reviews: [{
		type: mongoose.Types.ObjectId,
		ref: 'Comment'
	}],
	
	rates: [{
		type: mongoose.Types.ObjectId,
		ref: 'Rate'
	}],
	
	requests: [{
		type: mongoose.Types.ObjectId,
		ref: 'Request'
	}]
}

const options = {
	discriminatorKey: '_type',
	timestamps: true
}

const Schema = new mongoose.Schema(fields, options)

Schema.set('toJSON', { virtuals: true})
Schema.set('toObject', { virtuals: true})

Schema.virtual('rent').get(function(){
	const first = this.contract.warranty + (this.contract.monthsInAdvance * this.cost + this.maintenance)
	const monthly = this.cost + this.maintenance
	return {
		monthly,
		initial: first,
		total: first * 1.01,
		lessor: first - this.contract.warranty - (monthly * 0.09),
		comissions: {
			lessee: monthly * 0.01,
			lessor: monthly * 0.09,
			total: monthly * 0.10,
			first: first * 0.01
		}
	}
})

Schema.plugin(mongooseSoftdelete)

export default Schema
