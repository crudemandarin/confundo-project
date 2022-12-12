export class EventBus {
	subscribers;
	static nextId = 0;
	static instance = undefined;

	constructor() {
		this.subscribers = {};
	}

	static getInstance() {
		if (this.instance === undefined) {
			this.instance = new EventBus();
		}

		return this.instance;
	}

	dispatch(event, arg) {
		const subscriber = this.subscribers[event];

		if (subscriber === undefined) {
			return;
		}

		Object.keys(subscriber).forEach((key) => subscriber[key](arg));
	}

	register(event, callback) {
		const id = this.getNextId();
		if (!this.subscribers[event]) this.subscribers[event] = {};

		this.subscribers[event][id] = callback;

		return {
			unregister: () => {
				delete this.subscribers[event][id];
				if (Object.keys(this.subscribers[event]).length === 0)
					delete this.subscribers[event];
			}
		};
	}

	getNextId() {
		return EventBus.nextId++;
	}
}
