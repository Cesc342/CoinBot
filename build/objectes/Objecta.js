"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Objecta {
    constructor(nom, num, detalls) {
        this.num = 1;
        this.detalls = "";
        this.nom = nom;
        if (num) {
            this.num = num;
        }
        if (detalls) {
            this.detalls = detalls;
        }
    }
    gastar(num) {
        if (this.hiHaSuficients(num)) {
            this.num -= num;
            return true;
        }
        return false;
    }
    hiHaSuficients(num) {
        return this.num <= num;
    }
    obtenir(num) {
        this.num += num;
    }
}
exports.Objecta = Objecta;
