import User from 'model/user'
import spatie from "helper/spatie"

export const fetchAllUsers = async (req, res, next) => {
	if (await spatie.can(req.user.id, 'list', 'user'))
		next()
	else
		res.boom.unauthorized()
}

export const createUser = async (req, res, next) => {
	if (await spatie.can(req.user.id, 'create:any', 'user'))
		next()
	else
		res.boom.unauthorized()
}

export const editAnyUser = async (req, res, next) => {
	if (await spatie.can(req.user.id, ['update:any'], 'user'))
		next()
	else
		res.boom.unauthorized()
}

export const editOwnUser = async (req, res, next) => {
	if (await spatie.can(req.user.id, ['update:own'], 'user'))
		next()
	else
		res.boom.unauthorized()
}

export const editUser = async (req, res, next) => {
	if (await spatie.can(req.user.id, ['update:own'], 'user') || await spatie.can(req.user.id, ['update:any'], 'user'))
		next()
	else
		res.boom.unauthorized()
}

export const deleteUser = async (req, res, next) => {
	if (await spatie.can(req.user.id, ['delete:any'], 'user'))
		next()
	else
		res.boom.unauthorized()
}

export const restoreUser = async (req, res, next) => {
	if (await spatie.can(req.user.id, ['restore:any'], 'user'))
		next()
	else
		res.boom.unauthorized()
}
