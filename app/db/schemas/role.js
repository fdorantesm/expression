import mongoose from 'mongoose'

const fields = {

	name: {
		type: String
	},

	level: {
		type: Number,
		default: 0
	},

	active: {
		type: Boolean
	}
}

const options = {
	timestamps: true
}

const schema = new mongoose.Schema(fields, options)

export default schema
