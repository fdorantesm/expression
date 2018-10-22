import conekta from 'conekta-promises'

class Conekta {
	constructor() {
		conekta.locale = process.env.CONEKTA_LOCALE
		conekta.api_key = process.env.CONEKTA_PRIVATE
		this.conekta = conekta
	}
}

class Customer extends Conekta {
	
	constructor() {
		super()
		this.name = null
		this.email = null
		this.phone = null
		this.contacts = []
	}

	async save  () {
		
		const customer = await conekta.Customer.create({
			name: this.name,
			email: this.email,
			phone: this.phone,
			shipping_contacts: this.contacts
		})

		return customer
	}

	async all () {
		const customers = await conekta.Customer.find()
		return customers
	}

}

class Plan extends Conekta {
	constructor() {
		super()
	}	
}

class Order extends Conekta {
	constructor() {
		super()
	}	
}

export default { Conekta, Customer, Order, Plan }
