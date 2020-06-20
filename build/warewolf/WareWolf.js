"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Llistes_1 = require("../database/Llistes");
const Pobla_1 = require("./personatges/Pobla");
const Compilador_1 = require("../bot/compilador/Compilador");
const Cupido_1 = require("./personatges/Cupido");
const Llob_1 = require("./personatges/Llob");
class WareWolf extends Llistes_1.Llistes {
    constructor(llistaUsuaris) {
        super();
        this.compilador = new Compilador_1.Compilador();
        this.cargar(llistaUsuaris);
    }
    async cargar(llistaUsuaris) {
        let poblat = [];
        let llob_1 = new Llob_1.Llob(llistaUsuaris[0]);
        let llob_2 = new Llob_1.Llob(llistaUsuaris[1]);
        let cupido = new Cupido_1.Cupido(llistaUsuaris[1]);
        for (let n = 4; n < llistaUsuaris.length; n++) {
            poblat.push(new Pobla_1.Pobla(llistaUsuaris[n]));
        }
        this.set(llob_1.usuari.tag, llob_1);
        this.set(llob_2.usuari.tag, llob_2);
        this.set(cupido.usuari.tag, cupido);
        for (let pobla of poblat) {
            this.set(pobla.usuari.tag, pobla);
        }
        if (llistaUsuaris.length >= 4) {
            console.log("Hi ha suficients");
        }
        else {
            console.log("NO");
        }
    }
    async getById(idBrut) {
        let id = await this.compilador.treuraId(idBrut);
        await this.getAsync(id);
    }
}
exports.WareWolf = WareWolf;
