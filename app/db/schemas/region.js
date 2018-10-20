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
		type: mongoose.Types.ObjectId,
		ref: 'Country'
	}

}

const Schema = new mongoose.Schema(fields)

export default Schema
