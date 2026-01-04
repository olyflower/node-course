module.exports.getMessage = getMessage;

const http = require("http");
const os = require("os");
const personalModule = require("./personalmodule");

const port = 8000;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	const username = os.userInfo().username;
	const message = personalModule.getMessage(username);
	res.end(message);
});

server.listen(port, () => {});
