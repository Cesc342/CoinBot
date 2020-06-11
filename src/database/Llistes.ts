
export class Llistes<K,V> extends Map<K,V>{

    constructor(){
        super();
    }

    public async setAsync(key: K, value: V): Promise<void>
    {
        this.set(key, value);
    }

    public async getAsync(key: K): Promise<undefined | V>
    {
        return this.get(key);
    }

    public async forEachAsync(event: (value: V, key: K, map: Map<K,V>)=>any): Promise<void>
    {
        this.forEach(event);
    }
}