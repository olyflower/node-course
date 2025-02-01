import fs from "fs";
import { EventEmitter } from "node:events";

class LoggerEvent extends EventEmitter {}

export const eventLogger = new LoggerEvent();

function fn(logPath, formattedMsg) {
	setImmediate(() => {
		fs.appendFile(logPath, `${formattedMsg} \n`, (err) => {
			if (err) {
				console.error(
					"Error while try to put data to file",
					err.message
				);
			}
		});
	});
}

eventLogger.on("log", fn);
