import Card from 'model/card'
import User from 'model/user'
import Conekta from 'library/conekta'
import Log from 'library/log'

export default class ConektaController {

	static async createCard (req, res) {
		try {
			let customer = await Conekta.Customer.get('cus_2jWd9pYk6oQTLBWvF')
			let user = await User.findOne({ 'email': customer._json.email }).select('conekta').populate('profile')
			const card = await Conekta.Card.create(customer, req.body.card)
			if (card) {
				const cc = new Card({
					token: card.id,
					last4: card.last4,
					bin: card.bin,
					brand: card.brand,
					name: card.name,
					owner: user._id,
					default: card.default,
					exp: { month: card.exp_month, year: card.exp_year }
				})
				
				await cc.save()
				user.profile.cards.push(cc._id)
				await user.profile.save()
				Log.info(`${user.profile.name} added card (${card.last4}) with token ${card.id}`)
				res.send(card)
			}
		}

		catch (err) {
			Log.fatal('file: ConektaController. ERROR:' + JSON.stringify(err))
			res.boom.badData(null, err)
		}

	}

}