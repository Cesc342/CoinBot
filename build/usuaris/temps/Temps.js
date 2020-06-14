"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Temps extends Date {
    constructor() {
        super();
        this.segons = 0;
        this.minuts = 0;
        this.hores = 0;
        this.dies = 0;
        this.total = 0;
        this.agafarHMS();
    }
    async agafarHMS() {
        this.dies = this.getDay();
        this.segons = this.getSeconds();
        this.minuts = this.getMinutes();
        this.hores = this.getHours();
        this.total = this.HMS_S(this.dies, this.hores, this.minuts, this.segons);
    }
    HMS_S(dia, hores, minuts, segons) {
        let total = 0;
        total += dia * 24 * 60 * 60;
        total += hores * 60 * 60;
        total += minuts * 60;
        total += segons;
        return total;
    }
    S_HMS(total) {
        let diesBruts = total / (24 * 60 * 60);
        let dies = Math.floor(diesBruts);
        let diesResidu = diesBruts - dies;
        let horesBrutes = diesResidu * 24;
        let hores = Math.floor(horesBrutes);
        let horesResidu = horesBrutes - hores;
        let minutsBruts = horesResidu * 60;
        let minuts = Math.floor(minutsBruts);
        let minutsResidu = minutsBruts - minuts;
        let segonsBruts = minutsResidu * 60;
        let segons = Math.floor(segonsBruts);
        let data = {
            dies: dies,
            hores: hores,
            minuts: minuts,
            segons: segons
        };
        return data;
    }
    async comperar(dies, hores, minuts, segons) {
        await this.agafarHMS();
        let totalPerComparar = this.HMS_S(dies, hores, minuts, segons);
        return this.total - totalPerComparar;
    }
}
exports.Temps = Temps;
