import conekta from 'conekta-promises'

conekta.api_key = process.env.CONEKTA_PRIVATE
conekta.locale = process.env.CONEKTA_LOCALE

export default conekta
