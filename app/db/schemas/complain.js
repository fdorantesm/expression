import mongoose from 'mongoose'

let fields = {
	
	affected: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	
	counterpart: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	
	property: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Property'
	},
	
	reason: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Reason'
	},
	
	message: {
		type: String,
		minLength: 255
	},
	
	files: {
		type: []
	},
	
	read: {
		type: Date
	},
	
	status: {
		type: Number,
		default: 1
	}

}

const options = {
	timestamps: true
}

const schema = new mongoose.Schema(fields, options)

export default schema
