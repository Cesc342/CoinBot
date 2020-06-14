"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Inventori_1 = require("./Inventori");
const discord_js_1 = require("discord.js");
const Temps_1 = require("./temps/Temps");
class Usuari extends discord_js_1.User {
    constructor(user, { id, diners, banc, impostos }, dadesInv) {
        super(user.client, user);
        this.diners = 0;
        this.banc = 0;
        this.temps = new Temps_1.Temps();
        this.tempsTreballar = 0;
        this.impostos = 0.1; //Quant treu el banc cada vegada que guardes els diners 
        this.id = id;
        this.inventori = new Inventori_1.Inventori(dadesInv, this);
        //Ho he fet aixi perque el valor diners no dongui negatiu
        this.sumarDiners(diners);
        this.banc = banc;
        this.impostos = impostos;
    }
    implentarDades({ id, diners, banc }, dadesInv) {
        this.id = id;
        this.inventori = new Inventori_1.Inventori(dadesInv, this);
        //Ho he fet aixi perque el valor diners no dongui negatiu
        this.sumarDiners(diners);
        this.banc = banc;
    }
    //Es boolean perque comprova si s'ha pogut treure el diners o no
    //(De moment no vull donar la possibilitat de bancarrota)
    restarDiners(diners) {
        if (this.esPositiu(diners)) {
            const dinersAbans = this.diners;
            const dinersDespres = dinersAbans - diners;
            if (dinersDespres >= 0) {
                this.diners = dinersDespres;
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    }
    sumarDiners(diners) {
        if (this.esPositiu(diners)) {
            this.diners += diners;
        }
    }
    ficarBanc(diners) {
        if (this.esPositiu(diners)) {
            const dinersImpostats = this.impostBanc(diners);
            if (this.restarDiners(diners + dinersImpostats)) {
                this.banc += diners;
                console.log(`Els impostos han tret: ${dinersImpostats}$`);
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    }
    treuraBanc(diners) {
        if (this.esPositiu(diners)) {
            if (diners <= this.banc) {
                this.banc -= diners;
                this.sumarDiners(diners);
                return true;
            }
            return false;
        }
        return false;
    }
    impostBanc(diners) {
        return Math.round(diners * this.impostos);
    }
    async agafarDadesUsuari() {
        const dadesUsuari = {
            id: this.id,
            diners: this.diners,
            banc: this.banc,
            impostos: this.impostos
        };
        return dadesUsuari;
    }
    esPositiu(num) {
        return num >= 0;
    }
    treballar() {
        let r = Math.random() * 500 + 50;
        let diners = Math.round(r);
        this.sumarDiners(diners);
        return diners;
    }
    async robar(usuari) {
        let r = Math.random() * 900 - 300;
        let diners = Math.round(r);
        let possible = usuari.restarDiners(diners);
        if (possible) {
            if (diners >= 0) { // Determina si l'han agafat o no
                return diners;
            }
            else {
                return 0;
            }
        }
    }
}
exports.Usuari = Usuari;
