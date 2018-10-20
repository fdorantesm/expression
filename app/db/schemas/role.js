import mongoose from 'mongoose'

const fields = {

	name: {
		type: String
	},

	active: {
		type: Boolean
	}
}

const options = {
	timestamps: true
}

const Schema = new mongoose.Schema(fields, options)

export default Schema
