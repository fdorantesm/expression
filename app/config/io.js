import socket from 'socket.io'

export default class Socket {
	
	constructor() {
		this.io = null
		this.initialize = this.initialize.bind(this)
	}

	get io() {
		return this.io
	}

	initialize(server) {
		let io = socket(server)
		io.on('connection', (socket) => {
			console.log('connected')
		})
	}
}
