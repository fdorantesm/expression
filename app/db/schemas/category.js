import mongoose from 'mongoose'

const fields = {
	
	name: {
		es: {
			required: true,
			type: String
		}
	},
	
	route: {
		es: {
			type: String,
			required: true
		}
	},
	
	active: {
		type: Boolean,
		default: true
	}

}

const options = {
	timestamps: true
}

const schema = new mongoose.Schema(fields, options)

export default schema
