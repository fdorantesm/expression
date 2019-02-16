import i18n from 'i18n'
import options from 'config/i18n'

export default {
	instance: i18n,
	config: i18n.configure(options),
	init: i18n.init
}

