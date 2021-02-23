export class Queue<T extends Object> {
    private _queue: T[];

    constructor() {
        this._queue = [];
    }

    enqueue(obj: T) {
        this._queue.push(obj);
    }

    dequeue(): T {
        if(this._queue.length > 0){
            var first = this._queue.splice(0, 1);
            return first[0];
        }
        return null;
    }

    first(): T {
        if(this._queue.length > 0){
            return this._queue[0];
        }
        return null;
    }

    toArray() : T[] {
        return this._queue;
    }

    size(): number {
        return this._queue.length;
    }

    clear(): void {
        this._queue = [];
    }

    copy(): T[] {
        let tmp: T[] = [];
        for(var i = 0; i < this._queue.length; i++) {
            tmp.push(this._queue[i]);
        }
        return tmp;
    }


}