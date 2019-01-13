import fs from 'fs'
import http from 'http'
import https from 'https'
import app from 'app'
import Socket from 'library/io'

const port = process.env.APP_PORT

const key = fs.readFileSync(process.env.APP_SSL_KEY)
const cert = fs.readFileSync(process.env.APP_SSL_CERT)

const secure = {
	key,
	cert,
	passphrase: process.env.APP_SSL_PASSPHRASE
}

const server = {
	http: http.createServer(app),
	https: https.createServer(secure, app)
}

server.http.listen(process.env.APP_PORT)
server.http.on('error', onError)
server.http.on('listening', onListening)

server.https.listen(process.env.APP_SSL_PORT)
server.https.on('error', onError)
server.https.on('listening', onListening)

const sockets = {
	ws: Socket(server.http),
	wss: Socket(server.https)
}

function normalizePort(val) {
	const port = parseInt(val, 10)

	if (isNaN(port)) {
		// named pipe
		return val
	}

	if (port >= 0) {
		// port number
		return port
	}

	return false
}

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error
	}

	const bind = typeof error.port === 'string'? 'Pipe ' + error.port : 'Port ' + error.port
	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges')
			process.exit(1)
			break
		case 'EADDRINUSE':
			console.error(bind + ' is already in use')
			process.exit(1)
			break
		default:
			throw error
	}
}

function onListening() {
	const protocol = this.cert ? 'https' : 'http'
	const addr = (this.cert ? server.https : server.http).address()
	const bind = typeof addr === 'string'? 'pipe ' + addr : ':' + addr.port 
	console.log(`Listening on ${protocol}://localhost${bind}`)
}

// const key = fs.readFileSync(process.env.APP_SSL_KEY)
// const cert = fs.readFileSync(process.env.APP_SSL_CERT)

// const port = normalizePort(process.env.APP_PORT)
// app.set('http', port)

// const portSSL = normalizePort(process.env.APP_SSL_PORT)
// app.set('https', portSSL)

// const server = http.createServer(app)
// server.listen(port)
// server.on('error', onError)
// server.on('listening', onListening)

// const serverSecure = https.createServer({ key, cert, passphrase: process.env.APP_SSL_PASSPHRASE }, app)
// serverSecure.listen(portSSL)
// serverSecure.on('error', onError)
// serverSecure.on('listening', onListening)

export {server}
export {sockets}
