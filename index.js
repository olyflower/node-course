import dotenv from "dotenv";
import Logger from "./logger/logger.js";

dotenv.config();

const logger = new Logger();

logger.info("Info message");
logger.error("Some error");
logger.warning("Warning message");
logger.error(new Error("Some error message"));
