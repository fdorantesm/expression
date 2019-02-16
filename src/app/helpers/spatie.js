import acl from 'library/permissions'

class Spatie {

	static async is (user, role) {
		return await acl.hasRole(user, role)
	}

	static async can (user, permissions, resource) {
		return await acl.isAllowed(user, resource, permissions)
	}

	static async permissions (user, resources) {
		if (!resources) {
			const roles = await acl.userRoles(user)
			resources = await Spatie.resources(roles)
		}
		
		return await acl.allowedPermissions(user, resources)
	}

	static async resources (q, user) {

		let roles = []

		if (user == true) {
			roles = await acl._allUserRoles(q)
		}

		else {
			roles = q
		}

		const resources = await acl.whatResources(roles)

		return Object.keys(resources)

	}

	static async addUserRoles(user, roles) {
		return await acl.addUserRoles(user, roles)
	}

}

export default Spatie
