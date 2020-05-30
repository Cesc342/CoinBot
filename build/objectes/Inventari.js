"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Inventari {
    constructor({ id, objectes }) {
        this.objectes = new Map();
        this.id = id;
        for (let id in objectes) { //Potser Funciona??? Nose ho he fet a lo rapid
            this.objectes.set(id, objectes[id]);
        }
    }
    agafarInventari() {
    }
    guardarInventari() {
    }
}
exports.Inventari = Inventari;
