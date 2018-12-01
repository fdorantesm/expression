import mongoose from 'mongoose'

import mongooseBeautifulUniqueValidation from 'mongoose-beautiful-unique-validation'
import mongoosePaginate from 'mongoose-paginate-v2'

const fields = {

	nickname: {
		type: String,
		required: true,
		minLength: 6,
		maxLength: 24,
		unique: true
	},

	email: {
		type: String,
		required: true
	},

	password: {
		type: String,
		required: true
	},

	profile: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Profile',
		required: true
	},

	role: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Role',
		default: mongoose.Types.ObjectId("5bd4845873912e106d5481e7")
	},

	status: {
		type: Number,
		default: 0
	},

	token: {
		type: String
	},

	lastLogin: {
		type: Date
	}

}

const options = {
	discriminatorKey: '_type',
	timestamps: true
}

const User = new mongoose.Schema(fields, options)

User.post('remove', (user) => {
	const Profile = mongoose.model('Profile')
	Profile.findByIdAndRemove(user.profile, (err, row) => {
		if (err) {
			
		}

		else {
			
		}
	})
})

User.set('toObject', {
    transform: (doc, ret) => {
        delete ret.password
        delete ret.token
        return ret
    }
})

User.plugin(mongooseBeautifulUniqueValidation)
User.plugin(mongoosePaginate)

export default mongoose.model('User', User)
