const User = require("./User");

const chatRoom = {
	users: [],
	messages: [],
	actions: {},

	createUser(connection){
		this.users.push(new User(connection, this));
	},

	removeUser(user){
		for(let i = 0; i < this.users.length; i++){
			this.users = this.users.filter(current => current !== user);
			this.broadcast("user_left", user.data);
			this.broadcast("users", this.getUsersData());
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

	action(event, callback){
		this.actions[event] = callback;
	},

	on (e, user){
		const { _event, _payload } = e;
		this.actions[_event]({
			chatRoom,
			user
		}, _payload);
		// switch (e._event) {
		// 	case "message":
		// 		const message = e._payload;
		// 		message.id = new Date().getTime();
		// 		this.addMessage(message);//auto broadcast
		// 		break;
		// 	case "join":
		// 		user.setData(e._payload);
		// 		user.active = true;
		// 		this.broadcast("user_joined", e._payload);
		// 		this.broadcast("users", this.getUsersData());
		// 		break;
		// 	case "leave":
		// 		user.active = false;
		// 		this.broadcast("user_left", user.data);
		// 		this.broadcast("users", this.getUsersData());
		// 		break;
		// 	case "requestMessages":
		// 		user.emit("messages", this.messages);
		// 		break;
		// 	case "requestUsers":
		// 		user.emit("users", this.getUsersData());
		// 		break;
		// }
	}
};

chatRoom.action("message", function ({user, chatRoom}, data) {
	const message = data;
	message.id = new Date().getTime();
	chatRoom.addMessage(message);//auto broadcast
});

chatRoom.action("join", function ({user, chatRoom}, data) {
	user.setData(data);
	user.active = true;
	chatRoom.broadcast("user_joined", data);
	chatRoom.broadcast("users", chatRoom.getUsersData());
});

chatRoom.action("leave", function ({user, chatRoom}) {
	user.active = false;
	chatRoom.broadcast("user_left", user.data);
	chatRoom.broadcast("users", chatRoom.getUsersData());
});

chatRoom.action("requestMessages", function ({user, chatRoom}) {
	user.emit("messages", chatRoom.messages);
});

chatRoom.action("requestUsers", function ({user, chatRoom}) {
	user.emit("users", chatRoom.getUsersData());
});

module.exports = chatRoom;