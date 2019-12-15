const User = require("./User");

const chatRoom = {
	users: [],
	messages: [],

	createUser(connection){
		const user = new User(connection, this);
		this.users.push(user);
	},

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
	},

	on (e, user){
		switch (e._event) {
			case "message":
				const message = e._payload;
				message.id = new Date().getTime();
				chatRoom.addMessage(message);//auto broadcast
				break;
			case "join":
				chatRoom.broadcast("user_joined", e._payload);
				break;
			case "requestMessages":
				user.emit("messages", chatRoom.messages);
				break;
		}
	}
};

module.exports = chatRoom;