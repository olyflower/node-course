import { Readable, Writable, Duplex, Transform, pipeline } from "node:stream";
import { createReadStream, ReadStream } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import zlib from "node:zlib";
import crypto from "node:crypto";

const __filname = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filname);

const sourceFilePath = path.join(__dirname, "source.txt");
const destionationFilePath = path.join(__dirname, "secret.txt");

const readStream = fs.createReadStream(sourceFilePath);
const writeStream = fs.createWriteStream(destionationFilePath);

const zipTransformer = zlib.createGzip();
const upzipTransformer = zlib.createGunzip();

const transformStream = new Transform({
	transform(chunk, encoding, callback) {
		this.push(String(chunk.toString()).toUpperCase());
		callback();
	},
});

// readStream.on("data", (chunk) => {
// 	console.log(chunk.toString());
// });

// readStream.pipe(transformStream).pipe(zipTransformer).pipe(writeStream);

// pipeline(readStream, transformStream, zipTransformer, writeStream, (err) => {
// 	if (err) {
// 		console.error("Error: ", err);
// 	} else {
// 		console.log("Success!");
// 	}
// });

class EncryptTransformer extends Transform {
	constructor(secret) {
		super();

		this.cipher = crypto.createCipher("aes-256-cbc", secret);
	}

	_transform(ch, encoding, callback) {
		const encrypted = this.cipher.update(ch);

		console.log(encrypted.toString("hex"));

		this.push(encrypted);
		callback();
	}

	_flush(callback) {
		this.cipher._final();

		callback();
	}
}

class DecryptTransformer extends Transform {
	constructor(secter) {
		super();

		this.decipher = crypto.createDecipher("aes-256-cbc", secter);
	}

	_transform(ch, encoding, callback) {
		const decrypted = this.decipher.update(ch);

		console.log(decrypted.toString("utf8"));

		this.push(decrypted);
		callback();
	}
}

const encryptTransformer = new EncryptTransformer("my-super-secret");
const decryptTransformer = new DecryptTransformer("my-super-secret")

pipeline(readStream, encryptTransformer, writeStream, (err) => {
	if (err) {
		console.error("Error: ", err);
	} else {
		console.log("Success!");
	}
});
