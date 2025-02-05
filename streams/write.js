import { Writable } from "node:stream";
import fs from "node:fs";

// const writeble = new Writable({
// 	write(chunk, encoding, next) {
// 		console.log("Got: ", chunk.toString("utf8"));
// 		setTimeout(next, 1000);
// 	},
// });

// writeble.write("Hello");
// writeble.write("World");
// writeble.end("End data");

// class WritableStream extends Writable {
// 	_write(chunk, encoding, next) {
// 		console.log("Got: ", chunk.toString("utf8"));

// 		setTimeout(next, 1000);
// 	}
// }

// const wStream = new WritableStream();

// wStream.write("Hello");
// wStream.write("World");
// wStream.end("End data");

const wStream = fs.createWriteStream("test.txt");

let i = 1_000_000;
function write() {
	let success = true;

	while (i > 0 && success) {
		success = wStream.write(`Line number : ${i} \n`);
		i--;
	}

	if (i > 0 && success) {
		wStream.once("drain", write);
	} else {
		wStream.end();
	}
}

write();
