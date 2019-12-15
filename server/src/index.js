const WebSocketServer = require('websocket').server;
const http = require('http');

const chatRoom = {
	users: [],
	messages: [],

	removeUser(user){
		for(let i = 0; i < this.users.length; i++){
			if(this.users[i] === user){
				this.users.splice(i, 1);
				return;
			}
		}
	},

	broadcast(event, payload){
		for(let i = 0; i < this.users.length; i++){
			this.users[i].emit(event, payload);
		}
	},

	addMessage(message){
		this.messages.push(message);
		this.broadcast("new_message", message);
	}
};

const manageEvent = (e, user) => {
	switch (e._event) {
		case "message":
			const message = e._payload;
			message.id = new Date().getTime();
			chatRoom.addMessage(message);
			break;
		case "join":
			user.emit("join", { a: true });
			break;
		case "requestMessages":
			break;
		case "requestUsers":
			break;
	}
};

function User(connection) {
	this.connection = connection;

	connection.on('message', (e) => {
		const data = JSON.parse(e.utf8Data);
		manageEvent(data, this);
		//connection.sendUTF(message.utf8Data);
	});

	connection.on('close', (reasonCode, description) => {
		console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
		chatRoom.removeUser(this);
	});
}

User.prototype.emit = function (event, payload) {
	const data = JSON.stringify({
		_event: event,
		_payload: payload
	});

	this.connection.sendUTF(data);
};

const server = http.createServer(function(request, response) {
	response.writeHead(404);
	response.end();
});

server.listen(10006, function() {
	console.log((new Date()) + ' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
	httpServer: server,
	autoAcceptConnections: false
});

wsServer.on('request', function(request) {
	var connection = request.accept('echo-protocol', request.origin);
	console.log((new Date()) + ' Connection accepted.');

	var user = new User(connection);
	chatRoom.users.push(user);
});