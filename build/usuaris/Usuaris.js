"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDades_1 = require("../database/BaseDades");
const Usuari_1 = require("./Usuari");
class Usuaris {
    constructor() {
        this.llista = new Map();
        this.dataUsuaris = new BaseDades_1.BaseDades("data");
        this.dataInventoris = new BaseDades_1.BaseDades("inventoris");
    }
    async agafar() {
        await this.dataUsuaris.agafar();
        await this.dataInventoris.agafar();
        const dataUsu = this.dataUsuaris.json;
        const dataInv = this.dataInventoris.json;
        for (let id in dataUsu) {
            let usuari = new Usuari_1.Usuari(dataUsu[id], dataInv[id]);
            this.llista.set(usuari.id, usuari);
        }
    }
    async guardar() {
        let jsonUsu = this.dataUsuaris.json;
        let jsonInv = this.dataInventoris.json;
        this.llista.forEach((usuari, id) => {
            jsonUsu[id] = usuari.agafarDadesUsuari();
            jsonInv[id] = usuari.inventori.agafarInventori();
        });
        this.dataUsuaris.json = jsonUsu;
        this.dataInventoris.json = jsonInv;
        await this.dataUsuaris.guardar();
        await this.dataInventoris.guardar();
    }
    async nouUsuari(usuari) {
        this.llista.set(usuari.id, usuari);
        await this.guardar();
    }
}
exports.Usuaris = Usuaris;
