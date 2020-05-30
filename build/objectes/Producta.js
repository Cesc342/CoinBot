"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Producta {
    constructor(venedor, nom, cost, numero, detalls) {
        this.detalls = "";
        this.num = 1;
        this.venedor = venedor;
        this.nom = nom;
        this.cost = cost;
        if (numero) {
            this.num = numero;
        }
        if (detalls) {
            this.detalls = detalls;
        }
    }
    vendra(comprador) {
        comprador.restarDiners(this.cost);
        this.venedor.sumarDiners(this.cost);
    }
}
exports.Producta = Producta;
