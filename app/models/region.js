import mongoose from 'mongoose'

const fields = {

	name: {
		type: String,
		required: true
	},

	rel: {
		type: Number,
		unique: true,
		required: true
	},

	country: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Country'
	}

}

const Region = new mongoose.Schema(fields)

export default mongoose.model('Region', Region)
