"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Inventori {
    constructor({ id, objectes }) {
        this.objectes = new Map();
        this.id = id;
        for (let id in objectes) { //Potser Funciona??? Nose ho he fet a lo rapid
            this.objectes.set(id, objectes[id]);
        }
    }
    agafarInventori() {
        let dadesObjectes = {};
        this.objectes.forEach((objecta, nom) => {
            let dadesObjecta = objecta.agafarDades();
            dadesObjectes[nom] = objecta;
        });
        let data = {
            id: this.id,
            objectes: dadesObjectes
        };
        return data;
    }
}
exports.Inventori = Inventori;
