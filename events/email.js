import { EventEmitter } from "node:events";

class EmailEvent extends EventEmitter {}

const event = new EmailEvent();

event.on("auth", (name, email) => {
	console.log(`Hello ${name}, your email is ${email}`);
});

event.emit("auth", "John", "test@test.com");
