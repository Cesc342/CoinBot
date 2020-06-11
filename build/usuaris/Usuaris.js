"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDades_1 = require("../database/BaseDades");
const Usuari_1 = require("./Usuari");
const Compilador_1 = require("../bot/compilador/Compilador");
const Llistes_1 = require("../database/Llistes");
class Usuaris extends Llistes_1.Llistes {
    constructor() {
        super(...arguments);
        this.dataUsuaris = new BaseDades_1.BaseDades("data");
        this.dataInventoris = new BaseDades_1.BaseDades("inventoris");
        this.compilador = new Compilador_1.Compilador();
    }
    async agafar(bot) {
        await this.dataUsuaris.agafar();
        await this.dataInventoris.agafar();
        const dataUsu = this.dataUsuaris.json;
        const dataInv = this.dataInventoris.json;
        if (bot) {
            for (let id in dataUsu) {
                let usuariDiscord = await bot.users.fetch(id);
                let usuari = new Usuari_1.Usuari(usuariDiscord, dataUsu[id], dataInv[id]);
                this.set(usuari.id, usuari);
            }
        }
        else {
            for (let id in dataUsu) {
                let usuari = this.get(id);
                if (usuari) {
                    usuari.implentarDades(dataUsu[id], dataInv[id]);
                    this.set(usuari.id, usuari);
                }
                else {
                    console.error(`ERROR: no s'ha trobat l'usuari ${id}`);
                }
            }
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
    async nouUsuari(id, usuariDiscord) {
        let idPros = await this.compilador.treuraId(id);
        const dadUsu = {
            id: idPros,
            diners: 10,
            banc: 0
        };
        const dadInv = {
            id: idPros,
            objectes: {}
        };
        let usuari = new Usuari_1.Usuari(usuariDiscord, dadUsu, dadInv);
        this.set(usuari.id, usuari);
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
    async getById(idBrut) {
        console.log(idBrut);
        let id = await this.compilador.treuraId(idBrut);
        if (id) {
            console.log(`idBrut: ${idBrut} >>>>> ${id}`);
        }
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
