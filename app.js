import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { router } from "./src/routes/index.js";
import { userRouter } from "./src/routes/user.js";
import {testMiddleware} from "./src/middleware/test.js"
import {restriction} from "./src/middleware/request-restriction.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

global.__filename = __filename;
global.__dirname = __dirname;

const APP_PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(restriction)
app.use("/", router);
app.use("/user", testMiddleware, userRouter);

app.use((req, res, next) => {
	res.status(404).send("Not Found");
});

app.use((error, req, res, next) => {
	console.log({
		msg: error?.message,
	});

	res.status(500).send("error on server side");
});

app.listen(APP_PORT, () => {
	console.log(`Express server is listening on port ${APP_PORT}`);
});
