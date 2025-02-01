import dotenv from "dotenv";
import Logger from "./logger/logger.js";
import LoggerNew from "./logger/logger_new.js";
// import { sleep } from "./utils/helper.js";

dotenv.config();

const logger = new Logger();

// logger.info("Info message");
// logger.error("Some error");
// logger.warning("Warning message");
// logger.error(new Error("Some error message"));

// logger.info("now");
// await sleep(10_000);
// logger.info("after 10 ms");

// sleep(10_000).then(() => logger.info("after 10 ms"))

const loggerNew = new LoggerNew();
loggerNew.info("Info message");
loggerNew.error("Some error");
loggerNew.warning("Warning message");
