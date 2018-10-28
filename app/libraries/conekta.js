import conekta from 'conekta-promises'

conekta.locale = process.env.CONEKTA_LOCALE
conekta.api_key = process.env.CONEKTA_PRIVATE

const Conekta = {
	
	Customer: {
		
		create: async (params) => {
			const customer = await conekta.Customer.create({
				name: params.name,
				email: params.email,
				phone: params.phone,
				shipping_contacts: params.contacts
			})

			return customer
		},
		
		all: async () => {
			const customers = await conekta.Customer.find()
			return customers
		},

		get: async (id) => {
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

export default Conekta
