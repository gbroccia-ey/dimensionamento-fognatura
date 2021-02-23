export class Dictionary<T extends string, U> {
    private _keys: T[];
    private _values: U[];

    constructor() {
        this._keys = [];
        this._values = [];
    }

    addOrReplace(key: T, item: U) {
        var found = this._keys.findIndex(k => k === key);
        if(found > -1) {
            this._values[found] = item;
        }
        else {
            this._keys.push(key);
            this._values.push(item);
        }
    }

    get(key:T) : U {
        var found = this._keys.findIndex(k => k === key);
        if(found > -1) {
            return this._values[found];
        }
        else {
            return null;
        }
    }

    keys(): T[] {
        return this._keys;
    }

    values(): U[] {
        return this._values;
    }

    fromList(list: {key: T, value: U}[]): Dictionary<T, U> {
        if(this._keys.length === 0) {
            for( var x = 0; x < list.length; x++) {
                this._keys.push(list[x].key);
                this._values.push(list[x].value);
            }
        }
        return this;
    }
    
}