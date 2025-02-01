import fs, { mkdirSync } from "fs";
import path from "path";
import levels from "./levels.js";
import formatMessage from "./formatter.js";
import {eventLogger} from '../events/log.js'


class LoggerNew {
	constructor(logPath = "logs/app.log") {
		this.logPath = logPath;
		if (!fs.existsSync(path.dirname(this.logPath))) {
			mkdirSync(path.dirname(this.logPath), { recursive: true });
		}
	}

	__log(level, msg) {
		const formattedMsg = formatMessage(level, msg);

		eventLogger.emit('log', this.logPath, formattedMsg)
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

export default LoggerNew;
