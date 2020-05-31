"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDades_1 = require("../database/BaseDades");
const Usuari_1 = require("./Usuari");
class Usuaris {
    constructor() {
        this.llista = new Map();
        this.baseDades = new BaseDades_1.BaseDades("data");
    }
    async cargarLlista() {
        await this.baseDades.agafar();
        const data = this.baseDades.json;
        for (let dataUsuari in data) {
            let usuari = new Usuari_1.Usuari(data[dataUsuari]);
            this.llista.set(usuari.id, usuari);
        }
    }
    async guardarUsuaris() {
        let json = this.baseDades.json;
        this.llista.forEach((usuari, id) => {
            json[id] = usuari.agafarDadesUsuari();
        });
        this.baseDades.json = json;
        await this.baseDades.guardar();
    }
    async nouUsuari(usuari) {
        this.llista.set(usuari.id, usuari);
        await this.guardarUsuaris();
    }
}
exports.Usuaris = Usuaris;
