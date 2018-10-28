import mongoose from 'mongoose'

let fields = {

	socket: {
		type: String,
		required: true
	},
	
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref:'User',
		required: true
	},
	
	receiver: {
		type: mongoose.Schema.Types.ObjectId,
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

const Message = new mongoose.Schema(fields, options)

export default mongoose.model('Message', Message)
