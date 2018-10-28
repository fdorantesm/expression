import mongoose from 'mongoose'

const fields = {
	
	name: {
		type: Object,
		required: true,
		unique: true
	},
	
	icon: {
		type: String,
		required: true,
		unique: true
	},
	
	active: {
		type: Boolean,
		default: true
	}
}

const options = {
	timestamps: true
}

const Amenity = new mongoose.Schema(fields, options)


export default mongoose.model('Amenity', Amenity)
