export default {
	state: {
		messages: [],
		connected: false
	},

	mutations: {
		setMessages(state, messages){
			state.messages = messages;
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