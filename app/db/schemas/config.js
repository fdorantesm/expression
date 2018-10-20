import mongoose from 'mongoose'

const fields = {

	geo: {
		type: mongoose.Types.Mixed,
		required: true,
		country: {
			type: mongoose.Types.ObjectId,
			ref: 'Country'
		},
		region: {
			type: mongoose.Types.ObjectId,
			ref: 'Region'
		},
		city: {
			type: mongoose.Types.ObjectId,
			ref: 'City'
		}
	},

	maintenance: {
		type: mongoose.Types.Mixed,
		enabled: {
			type: Boolean,
			required: true
		},
	},
	
	fees: {
		type: mongoose.Types.Mixed,
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

const Schema = new mongoose.Schema(fields)

export default Schema

