export default {
	state: {
		messages: [],
		users: [],
		connected: false
	},

	mutations: {
		setMessages(state, messages){
			state.messages = messages;
		},

		setUsers(state, users){
			state.users = users;
		},

		addMessage(state, message){
			state.messages.push(message);
		},

		setConnected(state, connected = true){
			state.connected = connected;
		}
	},

	actions: {

	}
}