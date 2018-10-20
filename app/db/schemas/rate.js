import mongoose from 'mongoose'

const fields = {
	
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true
	},
	
	object: {
		type: mongoose.Types.ObjectId,
		ref: ['User','Property'],
		required: true
	},
	
	rate: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	}
	
}

const options = {
	timestamps: true
}

const Schema = new mongoose.Schema(fields, options)

export default Schema
