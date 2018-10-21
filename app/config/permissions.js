export default [
	// Root administrators
	{ role: 'root', resource: 'property', action: 'update:any', attributes: '*' },
	{ role: 'root', resource: 'property', action: 'delete:any', attributes: '*' },
	{ role: 'root', resource: 'property', action: 'create:any', attributes: '*' },
	{ role: 'root', resource: 'property', action: 'read:any', attributes: '*' },
	// Administrators
	{ role: 'adm', resource: 'property', action: 'create:own', attributes: '*, !reviews, !rates, !requests' },
	{ role: 'adm', resource: 'property', action: 'read:any', attributes: '*' },
	{ role: 'adm', resource: 'property', action: 'update:any', attributes: '*, !reviews, !rates, !requests' },
	{ role: 'adm', resource: 'property', action: 'delete:own', attributes: '*' },
	// moderators
	{ role: 'mod', resource: 'property', action: 'create:own', attributes: '*, !owner, !reviews, !rates, !requests' },
	{ role: 'mod', resource: 'property', action: 'read:any', attributes: '*' },
	{ role: 'mod', resource: 'property', action: 'update:any', attributes: '*, !owner, !reviews, !rates, !requests' },
	{ role: 'mod', resource: 'property', action: 'delete:own', attributes: '*' },
	// final users
	{ role: 'usr', resource: 'property', action: 'create:own', attributes: '*, !owner, !reviews, !rates, !requests'},
	{ role: 'usr', resource: 'property', action: 'read:any', attributes: '*'},
	{ role: 'usr', resource: 'property', action: 'update:own', attributes: '*, !owner, !reviews, !rates, !requests'},
	{ role: 'usr', resource: 'property', action: 'delete:own', attributes: '*'},
	
	{ role: 'guest', resource: 'property', action: 'read:any', attributes: '*'},
]
