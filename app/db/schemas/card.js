import mongoose from 'mongoose'

let fields = {

	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},

	type: {
		type: String,
		required: true
	},

	token: {
		type: String,
		required: true
	},

	status: {
		type: Number,
		required: true
	}

}

const options = {
	timestamps: true
}

const schema = new mongoose.Schema(fields, options)

export default schema
