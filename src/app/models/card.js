import mongoose from 'mongoose'

let fields = {

	token: {
		type: String,
		required: true
	},

	// type: {
	// 	type: String,
	// 	required: true
	// },

	brand: {
		type: String,
		required: true
	},

	last4: {
		type: String,
		length: 4,
		required: true
	},

	bin: {
		type: String,
		length: 6,
		required: true
	},

	exp: {
		month: {
			type: Number,
			required: true
		},
		year: {
			type: Number,
			required: true
		}
	},

	name: {
		type: String,
		required: true
	},

	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},

	default: {
		type: Boolean,
		required: true,
		default: false
	}

}

const options = {
	timestamps: true
}

const Card = new mongoose.Schema(fields, options)

export default mongoose.model('Card', Card)
