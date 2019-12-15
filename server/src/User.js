function User(connection, chatRoom) {
	this.connection = connection;
	this.chatRoom = chatRoom;

	connection.on('message', (data) => {
		const e = JSON.parse(data.utf8Data);
		chatRoom.on(e, this);
	});

	connection.on('close', (reasonCode, description) => {
		this.chatRoom.removeUser(this);
	});
}

User.prototype.emit = function (event, payload) {
	const data = JSON.stringify({
		_event: event,
		_payload: payload
	});

	this.connection.sendUTF(data);
};

module.exports = User;