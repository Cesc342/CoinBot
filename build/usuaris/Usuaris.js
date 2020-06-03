"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDades_1 = require("../database/BaseDades");
const Usuari_1 = require("./Usuari");
class Usuaris {
    constructor() {
        this.dataUsuaris = new BaseDades_1.BaseDades("data");
        this.dataInventoris = new BaseDades_1.BaseDades("inventoris");
    }
    async agafar() {
        await this.dataUsuaris.agafar();
        await this.dataInventoris.agafar();
        const dataUsu = this.dataUsuaris.json;
        const dataInv = this.dataInventoris.json;
        let llista = {};
        for (let id in dataUsu) {
            let usuari = new Usuari_1.Usuari(dataUsu[id], dataInv[id]);
            llista[usuari.tag] = usuari;
        }
        this.llista = llista;
    }
    async guardar() {
        let jsonUsu = this.dataUsuaris.json;
        let jsonInv = this.dataInventoris.json;
        for (let id in this.llista) {
            let usuari = this.llista[id];
            jsonUsu[id] = await usuari.agafarDadesUsuari();
            jsonInv[id] = await usuari.inventori.agafarInventori();
        }
        this.dataUsuaris.json = jsonUsu;
        this.dataInventoris.json = jsonInv;
        await this.dataUsuaris.guardar();
        await this.dataInventoris.guardar();
    }
    async nouUsuari(tag) {
        const dadUsu = {
            tag: tag,
            diners: 10,
            banc: 0
        };
        const dadInv = {
            tag: tag,
            objectes: {}
        };
        let usuari = new Usuari_1.Usuari(dadUsu, dadInv);
        this.llista[usuari.tag] = usuari;
        await this.guardar();
    }
}
exports.Usuaris = Usuaris;
