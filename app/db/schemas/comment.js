import mongoose from 'mongoose'

const fields = {
	
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}, 
	
	object: {
		type: mongoose.Schema.Types.ObjectId,
		refPath: 'objectModel',
		required: true
	},

	objectModel : {
		type: String,
		required: true,
		enum: ['User', 'Property']
	},
	
	body: {
		type: String,
		required: true
	},
	
	replyTo: {
		type: mongoose.Schema.Types.ObjectId,
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

const schema = new mongoose.Schema(fields, options)

export default schema
