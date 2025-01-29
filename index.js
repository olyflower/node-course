import dotenv from "dotenv";
import Logger from "./logger/logger.js";
import {sleep} from './utils/helper.js'

dotenv.config();

const logger = new Logger();

// logger.info("Info message");
// logger.error("Some error");
// logger.warning("Warning message");
// logger.error(new Error("Some error message"));

logger.info("now");
await sleep(10_000);
logger.info("after 10 ms");

// sleep(10_000).then(() => logger.info("after 10 ms"))
