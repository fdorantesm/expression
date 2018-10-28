import Card from 'model/card'
import User from 'model/user'
import Conekta from 'library/conekta'
import Log from 'library/log'

export default class ConektaController {

	static async createCard (req, res) {
		try {
			let customer = await Conekta.Customer.get(req.query.cust)
			let user = await User.findOne({ 'email': customer._json.email }).select('conekta').populate('profile')
			const card = await Conekta.Card.create(customer, req.query.card)
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

	static async removeCard (req, res) {
		try {
			let customer = await Conekta.Customer.get(req.query.cust)
			const removed = await Conekta.Card.remove(customer, req.query.card)
			console.log('removed', removed)
			if (removed) {
				const card = await Card.findOne({ token: removed.id })
				console.log('card',card)
				const user = await User.findOne({ email: customer._json.email }).populate('profile')
				console.log('user cards',user.profile.cards)
				const cards = user.profile.cards.filter(item => item.toString() != card.id.toString())
				user.profile.cards = cards
				console.log(cards, user.profile.cards)
				await card.delete()
				await user.profile.save()
				Log.info(`${user.profile.name} remove card (${card.last4}) with token ${card.token}`)
			}
			
			res.send({statusCode: 200})
		}

		catch (err) {
			Log.fatal('file: ConektaController@removeCard ERROR:' + JSON.stringify(err))
			res.boom.badData(null, err)
		}

	}

}