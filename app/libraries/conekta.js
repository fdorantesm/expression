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
		}

	},

	Plan: {

	},

	Order: {

	}

}

export default Conekta
