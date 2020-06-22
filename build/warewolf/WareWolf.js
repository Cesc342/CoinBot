"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Llistes_1 = require("../database/Llistes");
const Pobla_1 = require("./personatges/Pobla");
const Compilador_1 = require("../bot/compilador/Compilador");
const Bruixa_1 = require("./personatges/Bruixa");
const Cupido_1 = require("./personatges/Cupido");
const Llob_1 = require("./personatges/Llob");
const HelpMessage_1 = require("./HelpMessage");
class WareWolf extends Llistes_1.Llistes {
    constructor(llistaUsuaris, canal) {
        super();
        this.compilador = new Compilador_1.Compilador();
        this.helpMessage = new HelpMessage_1.HelpMessage();
        this.numRols = {
            poblat: 4,
            llop: 1
        };
        this.diaB = true;
        this.canal = canal;
        this.primerQueAcciona; //Perque no em dongi error
        this.cargar(llistaUsuaris);
    }
    set dia(b) {
        if (b) {
            this.forEach((usuari) => usuari.potVotar = true);
            this.canal.send("Hes ɖa ɖie");
            this.mirarMorts();
        }
        else {
            if (this.primerQueAcciona) {
                this.primerQueAcciona.potFerAccio = true;
                this.canal.send("Hes ɖa nïd");
            }
            else {
                this.canal.send("ERROR: calambre cerebral");
            }
        }
        this.diaB = b;
    }
    get dia() {
        return this.diaB;
    }
    async cargar(llistaUsuaris) {
        let poblat = [];
        this.dia = true;
        let bruixa = new Bruixa_1.Bruixa(llistaUsuaris[2], this);
        await llistaUsuaris[2].createDM();
        llistaUsuaris[2].dmChannel.send(`Tu vroyijá`);
        let llob_1 = new Llob_1.Llob(llistaUsuaris[0], this, bruixa);
        await llistaUsuaris[0].createDM();
        llistaUsuaris[0].dmChannel.send(`Tu yöv`);
        let cupido = new Cupido_1.Cupido(llistaUsuaris[1], this, llob_1);
        this.primerQueAcciona = cupido; // Pero aquest es el objecta que de veritat es el primer
        await llistaUsuaris[1].createDM();
        llistaUsuaris[1].dmChannel.send(`Tu kùpýdò`);
        for (let n = 3; n < llistaUsuaris.length; n++) {
            poblat.push(new Pobla_1.Pobla(llistaUsuaris[n], this));
            await llistaUsuaris[n].createDM();
            llistaUsuaris[n].dmChannel.send(`Tu pövlè`);
        }
        this.set(llob_1.usuari.id, llob_1);
        this.set(cupido.usuari.id, cupido);
        this.set(bruixa.usuari.id, bruixa);
        for (let pobla of poblat) {
            this.set(pobla.usuari.id, pobla);
        }
        if (llistaUsuaris.length >= 3) {
            console.log("Hi ha suficients");
        }
        else {
            console.log("NO");
        }
        return llob_1;
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
        console.log("WareWolf");
        if (votador && votat) {
            console.log("Pot votar: " + votador.potVotar);
            if (votador.potVotar) {
                votat.votacio++;
                votador.potVotar = false;
            }
        }
        if (await this.tothomaAVotat()) {
            this.dia = false;
            let mort = await this.guanyadorVotacio();
            this.canal.send("Tutöm a ɖòrmyr");
        }
    }
    async tothomaAVotat() {
        let totAVot = true;
        await this.forEachAsync((usuari) => totAVot = (!usuari.potVotar && totAVot));
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
    async anunciarMort(personatge) {
        this.canal.send(`${personatge.usuari.username} s'ha mort`);
        this.canal.send(`Ell era... ${personatge.rol}`);
        await this.contarMorts(personatge.rol);
        this.guanyador();
    }
    async contarMorts(rol) {
        if (rol == "llop") {
            this.numRols.llop--;
        }
        else {
            this.numRols.poblat--;
        }
    }
    guanyador() {
        if (this.numRols.llop == 0) {
            this.canal.send(`Han guanyat els llobs`);
        }
        else if (this.numRols.poblat == 0 || this.numRols.poblat > this.numRols.poblat) {
            this.canal.send(`Heu matat a tots els llobs`);
        }
    }
    mirarMorts() {
        this.forEach((jugador) => {
            if (jugador.potMorir && !jugador.mort) {
                jugador.mort = true;
                jugador.potMorir = false;
            }
        });
    }
}
exports.WareWolf = WareWolf;
