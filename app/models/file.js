import mongoose from 'mongoose'

const fields = {
	
	object: {
		type: mongoose.Schema.Types.ObjectId,
		refPath: 'objectModel',
		required: true
	},

	objectModel : {
		type: String,
		required: true,
		enum: ['User', 'Property', 'Comment']
	},

	type: {
		type: String,
		enum: [
			'file',
			'image',
			'video',
			'audio',
			'document',
			'bill',
			'receipt'
		],
		default: 'file'
	},

	path: {
		type: String,
		required: true
	}
	
}

const Country = new mongoose.Schema(fields)

export default mongoose.model('File', Country)
