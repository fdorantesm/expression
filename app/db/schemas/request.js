import mongoose from 'mongoose'
import mongooseSoftdelete from 'mongoose-softdelete'

const fields = {

	property: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Property',
		required: true
	},

	applicant: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},

	expectedDate: {
		type: Date,
		required: true
	},

	scheduledDate: {
		type: Date
	},

	message: {
		type: String,
		minLength: 50,
		maxLength: 255
	},

	reply: {
		type: String,
		minLength: 50,
		maxLength: 255
	},

	status: {
		type: Number,
		default: 0 
	},

	reason: {
		type: String
	}

}

const options = {
	timestamps: true
}

const schema = new mongoose.Schema(fields, options)

schema.plugin(mongooseSoftdelete)

export default schema
