"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Temps_1 = require("./Temps");
class Limit extends Temps_1.Temps {
    constructor(tempsLimit) {
        super();
        this.diesL = 0;
        this.horesL = 0;
        this.minutsL = 0;
        this.segonsL = 0;
        this.totalL = 0;
        this.cargar(tempsLimit);
    }
    async cargar({ dies, segons, minuts, hores }) {
        await this.agafarHMS();
        this.diesL = await this.cargarUndefined(dies);
        this.horesL = await this.cargarUndefined(hores);
        this.minutsL = await this.cargarUndefined(minuts);
        this.segonsL = await this.cargarUndefined(segons);
        this.totalL = this.HMS_S(this.diesL, this.horesL, this.minutsL, this.segonsL);
    }
    async cargarUndefined(numero) {
        if (numero) {
            return numero;
        }
        else {
            return 0;
        }
    }
    async shaVencutLimit() {
        await this.agafarHMS();
        return this.total <= this.totalL;
    }
    async agafarData() {
        const vencut = await this.shaVencutLimit();
        if (!vencut) {
            let data = {
                dies: this.diesL,
                hores: this.horesL,
                minuts: this.minutsL,
                segons: this.segonsL
            };
            return data;
        }
    }
}
exports.Limit = Limit;
