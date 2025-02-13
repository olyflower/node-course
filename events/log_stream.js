import fs from "fs";
import { EventEmitter } from "node:events";

class LoggerEvent extends EventEmitter {}

export const eventLoggerStream = new LoggerEvent();

function fn(logPath, formattedMsg) {
	const logStream = fs.createWriteStream(logPath, { flags: "a" });

	if (!logStream.write(`${formattedMsg}`)) {
		logStream.once("drain", () => {
			console.log("Success writing log!");
		});
	}
}

eventLoggerStream.on("log", fn);
