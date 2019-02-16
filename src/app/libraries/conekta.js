import conekta from 'conekta-promises'

conekta.locale = process.env.CONEKTA_LOCALE
conekta.api_key = process.env.CONEKTA_PRIVATE

export default {
	
	Customer: {
		
		async create (params) {
			const data = {}
			data.name = params.name
			data.email = params.email
			data.phone = params.phone
			
			if (params.contacts) {
				data.shipping_contacts = params.contacts
			}
			
			const customer = await conekta.Customer.create(data)
			return customer
		},
		
		async all () {
			const customers = await conekta.Customer.find()
			return customers
		},

		async get (id) {
			return await conekta.Customer.find(id)
		},
		
	},

	Card: {

		create: async (customer, token) => {
			return await customer.createPaymentSource({
				type: "card",
				token_id: token
			})
		},

		remove: async (customer, token) => {
			try {
				if (customer.payment_sources) {
					const cards = customer.payment_sources.toObject()
					const index = cards.data.findIndex(card => card.id == token)
					console.log(index)
					if (index >= 0){
						const removed = await customer.payment_sources.get(index).delete()
						return removed
					}
				}
			}

			catch (e) {
				console.log(e)
			}
		}

	},

	Plan: {

	},

	Order: {

	}

}
