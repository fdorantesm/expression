import Socket from 'socket.io'

export default function (server) {
	return Socket(server)
}
