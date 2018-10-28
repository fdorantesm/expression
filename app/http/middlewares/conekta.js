import User from 'model/user'
import spatie from "helper/spatie"
import Log from 'library/log'

export const createCard = async (req, res, next) => {
	if (await spatie.can(req.user.id, 'create:own', 'card'))
		next()
	else{
		Log.info(`${req.user.nickname} tried to create a card`)
		res.boom.unauthorized()
	}
}
