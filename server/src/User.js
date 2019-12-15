function User(connection, chatRoom) {
	this.connection = connection;
	this.chatRoom = chatRoom;
	this.data = null;
	this.active = false;

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

User.prototype.setData = function(data){
	this.data = data;
};

User.prototype.initialized = function(){
	return this.data != null;
};

User.prototype.toJson = function(){
	return  Object.assign(this.data || {}, { active: this.active });
};

module.exports = User;