"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Inventori {
    constructor({ id, objectes }) {
        this.id = id;
        this.objectes = objectes;
    }
    agafarInventori() {
        let dadesObjectes = {};
        for (let nom of this.objectes) {
            dadesObjectes[nom] = this.objectes[nom].agafarDades();
        }
        let data = {
            id: this.id,
            objectes: dadesObjectes
        };
        return data;
    }
}
exports.Inventori = Inventori;
