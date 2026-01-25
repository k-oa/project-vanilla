type EventMap = Record<string, any>;

type EventCallback<T> = (payload: T) => void;

export class EventEmitter<Events extends EventMap> {
    events = new Map<keyof Events, EventCallback<any>[]>();

    on<K extends keyof Events>(
        event: K,
        callback: EventCallback<Events[K]>
    ): void {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event)!.push(callback);
    }

    off<K extends keyof Events>(
        event: K,
        callback: EventCallback<Events[K]>
    ): void {
        const callbacks = this.events.get(event);
        if (!callbacks) return;

        const index = callbacks.indexOf(callback);
        if (index !== -1) callbacks.splice(index, 1);
    }

    emit<K extends keyof Events>(event: K, payload: Events[K]): void {
        const callbacks = this.events.get(event);
        if (!callbacks) return;

        callbacks.forEach((cb) => cb(payload));
    }
}
