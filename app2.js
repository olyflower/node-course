import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Logger from "./logger/logger_new.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logger = new Logger();

global.__filename = __filename;
global.__dirname = __dirname;

const APP_PORT = 3002;

const server = http.createServer();

server.on("request", (request, response) => {
	response.writeHead(200, {
		"content-type": "application/json",
	});

	response.end(JSON.stringify({
		testKey: "testValue",
		random: Math.random(),
	}));
});

server.listen(APP_PORT, () => {
	console.log(`Server is listening on port ${APP_PORT}`)
});
