import mongoose from 'mongoose'

const fields = {
	
	name: {
		type: String,
		required: true
	},
	
	type: {
		type: Number,
		default: 1
	},
	
	active: {
		type: Boolean,
		default: 1
	}

}

const options = {
	timestamps: true
}

const Reason = new mongoose.Schema(fields, options)

export default mongoose.model('Reason', Reason)