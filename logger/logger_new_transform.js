import fs, { mkdirSync } from "fs";
import path from "path";
import levels from "./levels.js";
import { eventLoggerStream } from "../events/log_stream.js";
import transformStream from "../streams/transform_log.js";

class LoggerTransform {
	constructor(logPath = "logs/app.log") {
		this.logPath = logPath;
		if (!fs.existsSync(path.dirname(this.logPath))) {
			mkdirSync(path.dirname(this.logPath), { recursive: true });
		}

		transformStream.on("data", (formattedMsg) => {
			eventLoggerStream.emit("log", this.logPath, formattedMsg);
		});
	}

	__log(level, msg) {
		const logData = JSON.stringify({ message: msg, type: level });
		transformStream.write(logData);
	}

	info(msg) {
		this.__log(levels.INFO, msg);
	}

	warning(msg) {
		this.__log(levels.WARNING, msg);
	}

	error(err) {
		this.__log(levels.ERROR, err);
	}
}

export default LoggerTransform;
