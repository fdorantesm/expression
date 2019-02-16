import mongoose from 'mongoose'

const fields = {

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},

	comment: {
		type: mongoose.Schema.Types.ObjectId,
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

const Like = new mongoose.Schema(fields, options)

export default mongoose.model('Like', Like)
