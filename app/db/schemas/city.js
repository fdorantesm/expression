import mongoose from 'mongoose'

let fields = {
	
	name: {
		type: String,
		required: true
	},
	
	rel: {
		type: Number,
		required: true
	},
	
	region: {
		type: mongoose.Types.ObjectId,
		ref: 'Region',
		required: true
	},
	
	country: {
		type: mongoose.Types.ObjectId,
		ref: 'Country'
	}

}

const schema =new mongoose.Schema(fields)

export default schema
