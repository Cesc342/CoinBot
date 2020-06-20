"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Llistes_1 = require("../database/Llistes");
const Pobla_1 = require("./personatges/Pobla");
const Compilador_1 = require("../bot/compilador/Compilador");
const Bruixa_1 = require("./personatges/Bruixa");
const Cupido_1 = require("./personatges/Cupido");
const Llob_1 = require("./personatges/Llob");
class WareWolf extends Llistes_1.Llistes {
    constructor(llistaUsuaris, canal) {
        super();
        this.compilador = new Compilador_1.Compilador();
        this.dia = true;
        this.canal = canal;
        this.cargar(llistaUsuaris);
    }
    async cargar(llistaUsuaris) {
        let poblat = [];
        let llob_1 = new Llob_1.Llob(llistaUsuaris[0], this);
        let llob_2 = new Llob_1.Llob(llistaUsuaris[1], this);
        let cupido = new Cupido_1.Cupido(llistaUsuaris[2], this);
        let bruixa = new Bruixa_1.Bruixa(llistaUsuaris[3], this);
        for (let n = 4; n < llistaUsuaris.length; n++) {
            poblat.push(new Pobla_1.Pobla(llistaUsuaris[n], this));
        }
        this.set(llob_1.tag, llob_1);
        this.set(llob_2.tag, llob_2);
        this.set(cupido.tag, cupido);
        for (let pobla of poblat) {
            this.set(pobla.tag, pobla);
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
        let usuari = await this.getAsync(id);
        return usuari;
    }
    async setTimeoutAsync(funcio, ms) {
        setTimeout(funcio, ms);
    }
    async votar(id, idVotat) {
        let votador = await this.getById(id);
        let votat = await this.getById(idVotat);
        if (votador && votat) {
            if (votador.potVotar) {
                votat.votacio++;
                votador.potVotar = false;
            }
        }
        if (await this.tothomaAVotat()) {
            this.dia = false;
            let mort = await this.guanyadorVotacio();
            this.canal.send("Tothom a dormir");
        }
    }
    async tothomaAVotat() {
        let totAVot = true;
        await this.forEachAsync((usuari) => totAVot = (usuari.potVotar && totAVot));
        return totAVot;
    }
    async guanyadorVotacio() {
        let guanyador;
        let n = true;
        this.forEach((usuari) => {
            if (n) {
                guanyador = usuari;
                n = false;
            }
            else {
                if (usuari.votacio > guanyador.votacio) {
                    guanyador = usuari;
                }
            }
        });
        return guanyador;
    }
    async anunciarMort(usuari) {
        this.canal.send(`${usuari.username} s'ha mort`);
    }
}
exports.WareWolf = WareWolf;
