import mongoose from 'mongoose'

const fields = {
	
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true
	},
	
	owner: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true
	},
	
	amont: {
		type: Number,
		required: true
	},
	
	attemps: [
		{
			date: {
				type: Date,
				default: Date.now()
			}
		}
	],
	
	card: {
		type: mongoose.Types.ObjectId,
		ref: 'Card'
	},
	
	status: {
		type: Number
	}

}

const options = {
	timestamps: true
}

const Schema = new mongoose.Schema(fields, options)

export default Schema
