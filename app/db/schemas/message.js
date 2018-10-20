import mongoose from 'mongoose'

let fields = {

	socket: {
		type: String,
		required: true
	},
	
	sender: {
		type: mongoose.Types.ObjectId,
		ref:'User',
		required: true
	},
	
	receiver: {
		type: mongoose.Types.ObjectId,
		ref:'User',
		required: true
	},
	
	seen: {
		type: Boolean,
		required: true
	},
	
	reported: {
		type: Boolean
	}

}

const options = {
	timestamps: true
}

const Schema = new mongoose.Schema(fields, options)

export default Schema
