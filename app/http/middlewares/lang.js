export default (req, res, next) => {
	req.i18n.setLocaleFromSubdomain()
	next()
}
