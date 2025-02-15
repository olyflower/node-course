import http from "node:http";
// import https from 'node:https'
// import http2 from "node:http2";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Logger from "./logger/logger_new.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logger = new Logger();

global.__filename = __filename;
global.__dirname = __dirname;

const APP_PORT = 3000;

// const server = https.createServer()
const server = http.createServer();

// server.on("request", (request, response) => {
// 	const options = {
// 		hostname: "localhost",
// 		path: request.path,
// 		method: request.method,
// 		headers: request.headers,
// 		port: 3002,
// 	};

// 	const proxyReq = http.request(options, (proxyRes) => {
// 		response.writeHead(proxyRes.statusCode, proxyRes.headers);
// 		proxyRes.pipe(response);
// 	});

// 	request.pipe(proxyReq);

// 	proxyReq.on("error", (err) => {
// 		logger.error(err);
// 		response.end("Proxy request failed", err.message);
// 	});
// });

server.on("request", (request, response) => {
	console.log("URL", request.url, "Method", request.method);

	if (request.method === "GET" && /^\/static/.test(request.url)) {
		response.writeHead(200, {
			"content-type": "text/html",
		});

		const filePath = `${global.__dirname}${request.url}`;
		const metaData = fs.lstatSync(filePath).isDirectory();

		if (fs.lstatSync(filePath).isDirectory()) {
			throw new Error("403 Forbidden action");
		}

		if (fs.lstatSync(filePath).isFile()) {
			const fileData = fs.readFileSync(filePath);
			response.end(fileData);
		}
	}

	// response.writeHead(200, {
	// 	"content-type": "application/json",
	// });

	// response.end("Text");
});

server.listen(APP_PORT, () => {
	console.log(`Server is listening on port ${APP_PORT}`);
});
