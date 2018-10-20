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
	
	body: {
		type: String,
		required: true
	},
	
	replyTo: {
		type: mongoose.Types.ObjectId,
		ref: 'Comment'
	},
	
	ip: {
		type: String,
		minLength: 7,
		maxLength: 15,
		required: true
	}
}

const options = {
	timestamps: true
}

const Schema = new mongoose.Schema(fields, options)

export default Schema
