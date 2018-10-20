const Conekta = {}
Conekta.locale = 'en'
Conekta.keys = function(env = 'local'){
	return {
		'public' : (env=='prod' ? process.env.CONEKTA_LIVE_PUBLIC : process.env.CONEKTA_TEST_PUBLIC),
		'private' : (env=='prod' ? process.env.CONEKTA_LIVE_PRIVATE : process.env.CONEKTA_TEST_PRIVATE)
	}
}

export default Conekta
