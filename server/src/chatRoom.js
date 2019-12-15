const User = require("./User");

const chatRoom = {
	users: [],
	messages: [],

	createUser(connection){
		this.users.push(new User(connection, this));
	},

	removeUser(user){
		for(let i = 0; i < this.users.length; i++){
			if(this.users[i] === user){
				this.users = this.users.splice(i, 1);
				this.broadcast("user_left", user.data);
				this.broadcast("users", this.getUsersData());
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

	getUsersData(){
		const data = [];

		for(let i = 0; i < this.users.length; i++){
			if(this.users[i].initialized()){
				data.push(this.users[i].toJson());
			}
		}

		return data;
	},

	on (e, user){
		switch (e._event) {
			case "message":
				const message = e._payload;
				message.id = new Date().getTime();
				this.addMessage(message);//auto broadcast
				break;
			case "join":
				user.setData(e._payload);
				user.active = true;
				this.broadcast("user_joined", e._payload);
				this.broadcast("users", this.getUsersData());
				break;
			case "leave":
				user.active = false;
				this.broadcast("user_left", user.data);
				this.broadcast("users", this.getUsersData());
				break;
			case "requestMessages":
				user.emit("messages", this.messages);
				break;
			case "requestUsers":
				user.emit("users", this.getUsersData());
				break;
		}
	}
};

module.exports = chatRoom;