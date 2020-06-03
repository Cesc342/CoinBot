"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Inventori {
    constructor({ tag: tag, objectes }) {
        this.tag = tag;
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
            console.table(obj);
            dadesObjectes[nom] = obj;
        }
        let data = {
            tag: this.tag,
            objectes: dadesObjectes
        };
        return data;
    }
}
exports.Inventori = Inventori;
