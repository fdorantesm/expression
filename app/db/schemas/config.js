import mongoose from 'mongoose'

const fields = {

	geo: {
		type: mongoose.Schema.Types.Mixed,
		required: true,
		country: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Country'
		},
		region: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Region'
		},
		city: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'City'
		}
	},

	maintenance: {
		type: mongoose.Schema.Types.Mixed,
		enabled: {
			type: Boolean,
			required: true
		},
	},
	
	fees: {
		type: mongoose.Schema.Types.Mixed,
		lessor: {
			enabled: {
				type: Boolean,
				required: true
			},
			breach: {
				type: Number
			}
		},
		lessee: {
			enabled: {
				type: Boolean,
				required: true
			},
			lack: Number,
			churn: Number
		}
	},
	
	comissions: {
		lessor: {
			type: Number,
			required: true
		},
		lessee: {
			type: Number,
			required: true
		}
	}
}

const schema = new mongoose.Schema(fields)

export default schema

