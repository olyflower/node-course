import { Duplex } from "node:stream";

class OwnDuplex extends Duplex {
	constructor(options) {
		super(options);
		this.data = ["Chunk 1", "Chunk 2", "Chunk 3", "Chunk 4"];
	}

	_read(size) {
		if (this.data.length > 0) {
			this.push(this.data.shift());
		} else {
			this.push(null);
		}
	}

	_write(chunk, encoding, next) {
		this.push(chunk.toString("utf8").toUpperCase());

		next();
	}
}

const duplex = new OwnDuplex();

duplex.on("data", (chunk) => {
	console.log("On data", chunk.toString("utf8"));
});

duplex.write("write str1");
duplex.write("write str2");

duplex.on("error", (err) => {
	console.log(err);
});

duplex.end();
