import User from 'model/user'
import Profile from 'model/profile'
import slug from 'slug'

export async function createCustomer(data) {

	const {
		firstName,
		lastName,
		social,
		nickname,
		password
	} = data

	const profileFields = {}
	const userFields = {}
	
	profileFields.firstName = firstName
	profileFields.lastName = lastName
	profileFields.social = social

	if (data.gender) {
		profileFields.gender = data.gender
	}

	if (data.dob) {
		profileFields.dob = data.dob
		userFields.nickname = slug(`${firstName}.${lastName}.${data.dob.getYear()}${data.dob.getMonth()}${data.dob.getDate()}`, { lower: true })
	} 

	else {
		const today = new Date()
		userFields.nickname = slug(`${firstName}.${lastName}.${today.getYear()}${today.getMonth()}${today.getDate()}`, { lower: true })
	}

	if (data.email) {
		userFields.email = data.email
	}

	userFields.password = password
	
	const profile = new Profile(profileFields)

	userFields.profile = profile.id

	const user = new User(userFields)
	
	return Promise.all([
		user.save(),
		profile.save()
	]).then(values => ({user: values[0], profile: values[1]}))

}
