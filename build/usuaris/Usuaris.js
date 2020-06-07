"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDades_1 = require("../database/BaseDades");
const Usuari_1 = require("./Usuari");
const Compilador_1 = require("../bot/compilador/Compilador");
class Usuaris extends Map {
    constructor() {
        super(...arguments);
        this.dataUsuaris = new BaseDades_1.BaseDades("data");
        this.dataInventoris = new BaseDades_1.BaseDades("inventoris");
        this.compilador = new Compilador_1.Compilador();
    }
    async agafar() {
        await this.dataUsuaris.agafar();
        await this.dataInventoris.agafar();
        const dataUsu = this.dataUsuaris.json;
        const dataInv = this.dataInventoris.json;
        for (let id in dataUsu) {
            let usuari = new Usuari_1.Usuari(dataUsu[id], dataInv[id]);
            this.set(usuari.tag, usuari);
        }
    }
    async guardar() {
        let jsonUsu = this.dataUsuaris.json;
        let jsonInv = this.dataInventoris.json;
        await this.forEachAsync(async (usuari, id) => {
            jsonUsu[id] = await usuari.agafarDadesUsuari();
            jsonInv[id] = await usuari.inventori.agafarInventori();
        });
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
        this.set(usuari.tag, usuari);
        await this.guardar();
        return usuari;
    }
    async usuariRandom() {
        let r = Math.random() * this.size;
        let numUsuari = Math.floor(r);
        let usuariRand;
        let i = 0;
        await this.forEachAsync(async (usuari, id) => {
            if (i == numUsuari) {
                usuariRand = usuari;
            }
            i++;
        });
        return usuariRand;
    }
    async forEachAsync(event) {
        this.forEach(event);
    }
    async getById(idBrut) {
        console.log(idBrut);
        let id = await this.compilador.treuraId(idBrut);
        console.log(`idBrut: ${idBrut} >>>>> ${id}`);
        let usuari;
        if (id) {
            usuari = this.get(id);
        }
        else {
            usuari = this.get(idBrut);
        }
        return usuari;
    }
}
exports.Usuaris = Usuaris;
