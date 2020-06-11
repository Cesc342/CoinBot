"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Llistes extends Map {
    constructor() {
        super();
    }
    async setAsync(key, value) {
        this.set(key, value);
    }
    async getAsync(key) {
        return this.get(key);
    }
    async forEachAsync(event) {
        this.forEach(event);
    }
}
exports.Llistes = Llistes;
