"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    gastar(num, usuari) {
        if (this.hiHaSuficients(num)) {
            this.num -= num;
            if (usuari) {
                while (num > 0) {
                    this.afecta(usuari);
                    num--;
                }
            }
            else {
                while (num > 0) {
                    this.afecta(this.usuari);
                    num--;
                }
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
    afecta(usuari) {
        if (this.afectes) {
            this.afectes.forEach((afecta, index) => {
                afecta(usuari);
            });
        }
    }
}
exports.Objecta = Objecta;
