import mongoose from 'mongoose'

const fields = {
	
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	
	object: {
		type: mongoose.Schema.Types.ObjectId,
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

const Rate = new mongoose.Schema(fields, options)

export default mongoose.model('Rate', Rate)
