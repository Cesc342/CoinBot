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
    agafarInventori() {
        let dadesObjectes = {};
        for (let nom in this.objectes) {
            dadesObjectes[nom] = this.objectes[nom].agafarDades();
        }
        let data = {
            tag: this.tag,
            objectes: dadesObjectes
        };
        return data;
    }
}
exports.Inventori = Inventori;
