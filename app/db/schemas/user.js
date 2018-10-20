import mongoose from 'mongoose'
import mongooseBeautifulUniqueValidation from 'mongoose-beautiful-unique-validation'

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
		type: mongoose.Types.ObjectId,
		ref: 'Profile',
		required: true
	},

	role: {
		type: mongoose.Types.ObjectId,
		ref: 'Role',
		default: mongoose.Types.ObjectId("59aad8487bc3533e54555ca2")
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

const schema = new mongoose.Schema(fields, options)

schema.post('remove', function(user) {
	const Profile = mongoose.model('Profile')
	Profile.findByIdAndRemove(user.profile, (err, row) => {
		if (err) {
			console.log(err)
		}

		else {
			console.log('user and profile deleted')
		}
	})
})

schema.set('toJSON', {
    transform: function(doc, ret, opt) {
        delete ret['password']
        delete ret['token']
        return ret
    }
})

schema.plugin(mongooseBeautifulUniqueValidation)

export default schema
