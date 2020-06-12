"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Inventori {
    constructor({ id, objectes }) {
        this.id = id;
        let objectesDespres = {};
        for (let idObj in objectes) {
            objectesDespres[idObj] = objectes[idObj];
        }
        this.objectes = objectesDespres;
    }
    async agafarInventori() {
        let dadesObjectes = {};
        for (let nom in this.objectes) {
            let obj = this.objectes[nom];
            dadesObjectes[nom] = obj;
        }
        let data = {
            id: this.id,
            objectes: dadesObjectes
        };
        return data;
    }
}
exports.Inventori = Inventori;
