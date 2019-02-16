import mongoose from 'mongoose'

const fields = {
	
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	
	owner: {
		type: mongoose.Schema.Types.ObjectId,
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
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Card'
	},
	
	status: {
		type: Number
	}

}

const options = {
	timestamps: true
}

const Payment = new mongoose.Schema(fields, options)

export default mongoose.model('Payment', Payment)
