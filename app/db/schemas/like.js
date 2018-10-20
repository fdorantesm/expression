import mongoose from 'mongoose'

const fields = {

	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true
	},

	comment: {
		type: mongoose.Types.ObjectId,
		ref: 'Comment',
		required: true
	},

	like: {
		type: Boolean,
		required: true
	}
	
}

const options = {
	timestamps: true
}

const Schema = new mongoose.Schema(fields, options)

export default Schema
