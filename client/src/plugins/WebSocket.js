import { w3cwebsocket as WsClient } from "websocket";

const PROTOCOL = "echo-protocol";
const SERVER = "ws://localhost";
const PORT = "10006";

const wsClient = {
	ws: null,
	handler: null,
	connected: false
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
	wsClient.connected = true;
	wsClient.handler({ _event: "setConnected", _payload: true });
};

const onClose = () => {
	wsClient.connected = false;
	wsClient.handler({ _event: "setConnected", _payload: false });
};

const onMessage = (e) => {
	const data = JSON.parse(e.data);
	wsClient.handler(data);
};

const emit = (event, payload) => {
	wsClient.ws.send(toMessage(event, payload));
};

const connect = () => {
	const ws = new WsClient(SERVER + ":" + PORT, PROTOCOL);

	ws.onerror = onError;
	ws.onopen = onOpen;
	ws.onclose = onClose;
	ws.onmessage = onMessage;

	wsClient.ws = ws;
};

const disconnect = () => {
	wsClient.ws.disconnect();
};

const connected = () => {
	return wsClient.connected;
};

const ws = {
	connect,
	emit,
	disconnect,
	connected
};

const install = (Vue, options) => {
	Vue.prototype.$ws = ws;
	wsClient.handler = options.handler;
};

export default {
	install
}