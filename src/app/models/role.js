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

const Role = new mongoose.Schema(fields, options)

export default mongoose.model('Role', Role)
