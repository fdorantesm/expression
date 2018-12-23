#!/usr/bin/env node

import debug from 'debug'
import {server, sockets} from 'server'

const {ws, wss} = sockets

// ws.on('connection', client => console.log('welcome', client.id))
wss.on('connection', socket => {
	console.log(socket.id, 'connected via wss')
	socket.on('gol', function(gol) {
		console.log('client: ping')
		wss.emit('pong', 'server: pong ')
	});
})

// setInterval(() => {
//  	console.log('servidor cuenta chiste')
//  	wss.emit('joke', 'jajajajajaja')
// }, 5000)
