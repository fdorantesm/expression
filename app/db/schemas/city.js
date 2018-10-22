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
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Region',
		required: true
	},
	
	country: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Country'
	}

}

let options = {
	timestamps: true
}

const schema = new mongoose.Schema(fields, options)

export default schema
