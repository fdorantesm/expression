import acl from 'library/permissions'

acl.allow([
	{
		roles: ['guest'],
		allows: [
			{ resources: 'property', permissions: ['list:any', 'get:any'] },
			{ resources: 'user', permissions: ['get:any'] },
		]
	},
	{
		roles: ['client'],
		allows: [
			{ resources: 'property', permissions: ['create:own', 'update:own', 'delete:own'] },
		]
	},
	{
		roles: ['mod'],
		allows: [
			{ resources: 'user', permissions: ['list'] }
		]
	},
	{
		roles: ['admin'],
		allows: [
			{ resources: 'property', permissions: ['create:any', 'update:any', 'delete:any', 'restore:any'] },
			{ resources: 'user', permissions: ['create:any', 'update:any'] },
		]
	},
	{
		roles: ['root'],
		allows: [
			{ resources: 'user', permissions: ['delete:any', 'restore:any'] }
		]
	}
])

acl.addRoleParents('client', 'guest')
acl.addRoleParents('broker', 'guest')
acl.addRoleParents('mod', ['guest', 'client'])
acl.addRoleParents('admin', ['guest', 'client', 'mod'])
acl.addRoleParents('root', ['guest', 'client', 'mod', 'admin'])

export default () => acl
