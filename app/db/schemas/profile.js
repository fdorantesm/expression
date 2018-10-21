import mongoose from 'mongoose'

const fields = {

	name: {
		type: String,
		required: true
	},

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
			type: String
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
		}
	},
	
	phone: {
		type: String
	},
	
	dob: {
		type: Date,
		required: true
	},
	
	ID: {
		valid:{
			type: Boolean
		},
		front: {
			type: String,
			required: true
		},
		back: {
			type: String,
			required: true
		}
	},
	
	conekta: {
		type: String
	},
	
	verified: {
		type: Boolean,
		default: false
	}

}

const options = {
	collection: 'profiles',
	discriminatorKey: '_type',
	timestamps: true
}

const Schema = new mongoose.Schema(fields, options)

Schema.set('toJSON', {
    transform: (doc, ret, opt) => {
        delete ret['ID']['front']
        delete ret['ID']['back']
        return ret
    }
})

export default Schema
