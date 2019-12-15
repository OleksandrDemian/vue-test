import { w3cwebsocket as WsClient } from "websocket";

const wsClient = {
	ws: null,
	store: null
};

const toMessage = (event, payload) => {
	return JSON.stringify({
		_event: event,
		_payload: payload
	});
};

const onError = () => {

};

const onOpen = () => {
	wsClient.store.commit("setConnected");
	emit("join", { test: true });
	emit("requestMessages");
};

const onClose = () => {
	wsClient.store.commit("setConnected", false);
};

const onMessage = (e) => {
	const data = JSON.parse(e.data);
	switch (data._event) {
		case "new_message":
			wsClient.store.commit("addMessage", data._payload);
			break;
		case "messages":
			wsClient.store.commit("setMessages", data._payload);
			break;
	}
};

const emit = (event, payload) => {
	wsClient.ws.send(toMessage(event, payload));
};

const connect = () => {
	const ws = new WsClient("ws://localhost:10006/", "echo-protocol");

	ws.onerror = onError;
	ws.onopen = onOpen;
	ws.onclose = onClose;
	ws.onmessage = onMessage;

	wsClient.ws = ws;
};

const disconnect = () => {
	alert("Disconnect");
};

const ws = {
	connect,
	emit,
	disconnect
};

const install = (Vue, options) => {
	Vue.prototype.$ws = ws;
	wsClient.store = options.store;
};

export default {
	install
}