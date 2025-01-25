	import fs, { mkdirSync } from "fs";
	import path from "path";
	import levels from "./levels.js";
	import formatMessage from "./formatter.js";

	class Logger {
		constructor(logPath = "logs/app.log") {
			this.logPath = logPath;
			if (!fs.existsSync(path.dirname(this.logPath))) {
				mkdirSync(path.dirname(this.logPath), { recursive: true });
			}
		}

		__log(level, msg) {
			
			const formattedMsg = formatMessage(level, msg);

			if (process.env.APP_ENV === "local") {
				console.log(formattedMsg);
			} else {
				fs.appendFile(this.logPath, `${formattedMsg} \n`, (err) => {
					if (err) {
						console.error(
							"Error while try to put data to file",
							err.message
						);
					}
				});
			}
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

	export default Logger;
