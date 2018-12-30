import User from 'model/user'
import Profile from 'model/profile'

export async function createCustomer(data) {

	const {
		firstName,
		lastName,
		social,
		email,
		nickname,
		password
	} = data

	const profile = new Profile({
		firstName,
		lastName,
		social
	})

	const user = new User({
		email,
		nickname,
		password,
		profile: profile._id
	})
	
	return Promise.all([
		user.save(),
		profile.save()
	]).then(values => ({user: values[0], profile: values[1]}))

}
