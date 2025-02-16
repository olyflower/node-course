import path from "node:path";
import { fileURLToPath } from "node:url";
import express, { json } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

global.__filename = __filename;
global.__dirname = __dirname;

const APP_PORT = 3000;

const server = express();

server.use(json())

server.post("/", json(), (req, res) => {
	console.log({ body: req.body });
	res.send("Hello from express");
});

server.listen(APP_PORT, () => {
	console.log(`Express server is listening on port ${APP_PORT}`);
});
