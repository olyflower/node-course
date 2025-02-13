import { Transform } from "stream";
import formatMessage from "../logger/formatter.js";

const transformStream = new Transform({
	transform(chunk, encoding, callback) {
		const { message, type } = JSON.parse(chunk.toString());
		const timestamp = new Date().toISOString();

		const formattedMsg = formatMessage(type, message, timestamp);

		this.push(formattedMsg + "\n");
		callback();
	},
});

export default transformStream;
