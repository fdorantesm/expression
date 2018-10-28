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
			type: mongoose.Schema.Types.ObjectId,
			ref: 'City'
		},
		region: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Region'
		},
		country: {
			type: mongoose.Schema.Types.ObjectId,
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
	},

	cards: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Card'
	}]

}

const options = {
	collection: 'profiles',
	discriminatorKey: '_type',
	timestamps: true
}

const Profile = new mongoose.Schema(fields, options)

Profile.set('toJSON', {
    transform: (doc, ret, opt) => {
    	delete ret['address']
    	delete ret['phone']
    	delete ret['conekta']
        delete ret['ID']['front']
        delete ret['ID']['back']
        return ret
    }
})

export default mongoose.model('Profile', Profile)
