import express from 'express'
import Router from './http/routes/Router'
import environment from './config/environment'

const app = express()

environment(app, express)

// const filter = helper('filters')

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
});

app.use('/', Router)

app.use(function(req, res, next) {
	let err = new Error('Not Found')
	err.status = 404
	next(err)
})

app.use(function(err, req, res, next) {
	res.locals.message = err.message
	res.locals.error = req.app.get('env').ENV === 'local' ? err : {}
	res.status(err.status || 500)
	res.render('error')
})

export default app
