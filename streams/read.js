import { Readable } from "node:stream";
import { createReadStream } from "node:fs";

const d = ["Hello", "World"];

// const stream = new Readable({
// 	read() {
// 		this.push("Hello");
// 		this.push("World");
// 		this.push(null);
// 	},
// });

// class ReadableClass extends Readable {
// 	constructor(options) {
// 		super(options);
// 	}

// 	_read() {
// 		d.forEach((item) => this.push(item));
// 		this.push(null);
// 	}
// }

// const stream = new ReadableClass({
// 	highWaterMark: 1024,
// 	encoding: "utf8",
// });

// stream.on("data", (chunk) => {
// 	console.log(chunk.toString("utf8"));
// });

// stream.on("end", () => {
// 	console.log("Stream finished");
// });


const stream = createReadStream('users.txt', {
	highWaterMark: 1024,
	encoding: "utf8",
})

let count  = 0

stream.on("data", (chunk) => {

	++count
	console.log(chunk.toString("utf8"))
})

stream.on('end', () => {
	console.log('Stream finished', "count:", `${count}`)
})
