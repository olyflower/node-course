import http from "node:http";
import { getRandomArbitrary, getRandomIntInclusive } from "./utils/helper.js";

const APP_PORT = 3000;

const server = http.createServer();

server.on("request", (req, res) => {
	if (req.method === "GET" && getRandomIntInclusive(1, 10) === 1) {
		res.writeHead(500, {
			"content-type": "application/json",
		});

		res.end("Error");
	} else {
		setTimeout(() => {
			res.writeHead(200, {
				"content-type": "application/json",
			});

			res.end("Text");
		}, Math.floor(getRandomArbitrary(1000, 3000)));
	}
});

server.listen(APP_PORT, () => {
	console.log(`Server is listening on port ${APP_PORT}`);
});
