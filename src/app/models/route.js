import mongoose from 'mongoose'

const fields = {

	slug: {
		type: String,
		maxLength: 64,
		required: true
	},

	active: {
		type: Boolean,
		required: true,
		default: true
	}

}

const options = {
	timestamps: true
}

const Route = new mongoose.Schema(fields, options)

export default mongoose.model('Route', Route)
