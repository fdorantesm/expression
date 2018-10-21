import conekta from 'library/conekta'
import lang from 'library/lang'

const api = {
	customer: {},
	order: {},
	card: {},
}

api.customer.create = async (params) => {
	let customer = await conekta.Customer.create(params)
	return customer
}

api.customer.all = async () => {
	let clientes = await conekta.Customer.find()
	if (clientes.toObject().total) {
		return clientes
	}

	let err = new Error('Bad Request')
	err.status = 400
	err.text = 'NotFound'
	throw err
}

export default api
