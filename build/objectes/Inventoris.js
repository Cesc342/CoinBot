"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Inventori_1 = require("./Inventori");
const BaseDades_1 = require("../database/BaseDades");
class Inventoris {
    constructor() {
        this.llista = {};
        this.baseDades = new BaseDades_1.BaseDades("inventoris");
    }
    async agafar() {
        await this.baseDades.agafar();
        const json = this.baseDades.json;
        for (let id in json) {
            let inventori = new Inventori_1.Inventori(json[id]);
            console.table(inventori.objectes);
            this.llista[id] = inventori;
        }
    }
    async guardar() {
        let json = {};
        for (let id in this.llista) {
            json[id] = this.llista[id].agafarInventori();
        }
    }
    nouInventori(inventori) {
        for (let inventori of this.llista) {
            if (inventori.id == inventori.id) {
                return false;
            }
        }
        this.llista.set(inventori.id, inventori);
        this.guardar();
        return true;
    }
}
exports.Inventoris = Inventoris;
