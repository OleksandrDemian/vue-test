let store = null;

const init = options => {
	store = options.store;
};

const handle = data => {
	switch (data._event) {
		case "new_message":
			store.commit("addMessage", data._payload);
			break;
		case "messages":
			store.commit("setMessages", data._payload);
			break;
		case "setConnected":
			store.commit("setConnected", data._payload);
			break;
	}
};

export default function (options) {
	init(options);
	return handle;
}