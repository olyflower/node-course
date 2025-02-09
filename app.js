import http from "node:http";
import fs from "node:fs";
import { parse } from "querystring";

const APP_PORT = 3000;

const server = http.createServer((request, response) => {
	console.log(
		"URL",
		request.url,
		"Method",
		request.method,
		"headers",
		request.headers
	);

	const writeStream = fs.createWriteStream("http-data.txt", { flags: "a" });

	writeStream.write(`\n==== New Request ====\n`);
	writeStream.write(`URL: ${request.url}\n`);
	writeStream.write(`Method: ${request.method}\n`);
	writeStream.write(
		`Headers: ${JSON.stringify(request.headers, null, 2)}\n\n`
	);

	request.pipe(writeStream);

	if (request.method === "POST") {
		let body = "";
		request.on("data", (data) => {
			body += data.toString();
		});

		request.on("end", () => {
			let res = "";

			switch (
				String(request.headers["content-type"]).toLocaleLowerCase()
			) {
				case "application/x-www-form-urlencoded":
					res = parse(body);
					break;
				case "application/json":
					res = JSON.parse(body);
					break;
				case "text/plain":
					res = body;
					break;
				case "multipart/form-data":
					break;
			}

			console.log({ res });
		});
	}

	response.writeHead(200, {
		"content-type": "application/json",
	});

	response.end(JSON.stringify({ key: "value" }));
});

server.listen(APP_PORT, () => {
	console.log(`Server is listening on port ${APP_PORT}`);
});
