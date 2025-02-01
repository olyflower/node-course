class EventEmitter {
	constructor() {
		this.events = {};
	}

	on(eventName, listener) {
		if (!this.events[eventName]) {
			this.events[eventName] = [];
		}

		this.events[eventName].push(listener);
	}

	emit(eventName, ...arg) {
		if (!this.events[eventName]) return false;

		this.events[eventName].forEach((listener) => {
			listener(...arg);
		});
	}

	off(eventName, listener) {
		if (!this.events[eventName]) return false;

		this.events[eventName] = this.events[eventName].filter(
			(itm) => itm !== listener
		);
	}
}

const emitter = new EventEmitter()
const onHello = (name) => {
	console.log(`Hello ${name}`)
}
const HELLO_EVENT = 'event1'
emitter.on(HELLO_EVENT, onHello)
emitter.emit(HELLO_EVENT, 'John')