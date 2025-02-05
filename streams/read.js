import { Readable } from "node:stream";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const d = ["Hello", "World", "!"];

// const stream = new Readable({
// 	read() {

// 		this.push("Hello");
// 		this.push("World");
// 		this.push(null);
// 	},
// });

class ReadableClass extends Readable {
	constructor(filename, options = {}) {
		super(options);

		this.fd = fs.openSync(filename, "r");
		this.bufferSize = options["bufferSize"] || 16384;
		this.position = 0;
	}

	_read(size) {
		const buffer = Buffer.alloc(size);
		fs.read(this.fd, buffer, 0, size, this.position, (err, bytesRead) => {
			if (err) {
				this.destroy(err);
				return;
			}

			if (bytesRead > 0) {
				this.push(buffer.subarray(0, bytesRead));

				this.position += bytesRead;
			} else {
				this.push(null);
			}
		});
	}

	_destroy(err, cb) {
		if (this.fd) {
			fs.closeSync(this.fd);
			this.fd = null;
		}

		if (cb) {
			cb(err);
		}
	}
}

const filePath = path.join(__dirname, "users.txt");

const stream = new ReadableClass(filePath, {
	highWaterMark: 64 * 1024,
	encoding: "utf8",
});

// const stream = fs.createReadStream(filePath, {
// 	highWaterMark: 64 * 1024,
// 	encoding: "utf8",
// });

stream.on("data", (chunk) => {
	console.log(chunk.toString("utf8"));
});

stream.on("end", () => {
	console.log("Stream finished");
});
