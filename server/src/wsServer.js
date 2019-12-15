const WebSocketServer = require('websocket').server;

module.exports = function (server, connectionHandler) {
	const wsServer = new WebSocketServer({
		httpServer: server,
		autoAcceptConnections: false
	});

	wsServer.on('request', connectionHandler);

	return wsServer;
};