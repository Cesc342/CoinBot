"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Afecta_1 = require("./afectes/Afecta");
class Objecta {
    constructor(usuari, nom, num, detalls) {
        this.num = 1;
        this.detalls = "No te descrupció";
        this.afectes = undefined;
        this.usuari = usuari;
        this.nom = nom;
        if (num) {
            this.num = num;
        }
        if (detalls) {
            this.detalls = detalls;
        }
    }
    gastar(num, altreUsuari) {
        if (this.hiHaSuficients(num)) {
            this.num -= num;
            while (num > 0) {
                this.afecta(new Afecta_1.Afecta(this, this.usuari, altreUsuari));
                num--;
            }
            return true;
        }
        return false;
    }
    hiHaSuficients(num) {
        return this.num >= num;
    }
    obtenir(num) {
        this.num += num;
    }
    async agafarDades() {
        let data = {
            nom: this.nom,
            num: this.num,
            detalls: this.detalls
        };
        return data;
    }
    //------------------------------------------------------ AFECTES ------------------------------------------------------
    afecta(afecta) {
        if (this.afectes) {
            this.afectes.forEach((afectaFuncio) => afectaFuncio(afecta));
        }
    }
}
exports.Objecta = Objecta;
