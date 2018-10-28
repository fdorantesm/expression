import mongoose from 'mongoose'

const fields = {
	
	name: {
		type: String,
		required: true
	},
	
	code: {
		type: String,
		length: 2,
		uppercase: true,
		required: true
	},
	
	phone: [String]
	
}

const Country = new mongoose.Schema(fields)

export default mongoose.model('Country', Country)
