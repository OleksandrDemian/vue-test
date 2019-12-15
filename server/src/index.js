const http = require('http');
const chatRoom = require("./chatRoom");
const wsServer = require("./wsServer");

const server = http.createServer(function(request, response) {
	response.writeHead(404);
	response.end();
});

server.listen(10006, function() {
	console.log((new Date()) + ' Server is listening on port 8080');
});

wsServer(server, function (request) {
	const connection = request.accept('echo-protocol', request.origin);
	chatRoom.createUser(connection);
});