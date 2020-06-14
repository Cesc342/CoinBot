"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Objecta_1 = require("./Objecta");
const Usuari_1 = require("../../usuaris/Usuari");
const discord_js_1 = require("discord.js");
class Producta extends Objecta_1.Objecta {
    constructor() {
        super(...arguments);
        this.cost = 0;
        this.venedor = new Usuari_1.Usuari(new discord_js_1.User(new discord_js_1.Client(), {}), { id: "", diners: 0, banc: 0, impostos: 0.1 }, { id: "", objectes: {} });
    }
    async processarDades({ nom, detalls, num, cost, venedor }) {
        this.nom = nom;
        this.detalls = detalls;
        this.num = num;
        this.cost = cost;
        this.venedor = venedor;
    }
    async completarInfo(venedor, cost) {
        this.cost = cost;
        this.venedor = venedor;
    }
    comprar(comprador, num) {
        if (this.gastar(num)) {
            if (comprador.restarDiners(this.cost * num)) {
                this.venedor.sumarDiners(this.cost * num);
                return true;
            }
        }
        return false;
    }
    agafarDades() {
        let dades = {
            cost: this.cost,
            venedor: this.venedor.id,
            nom: this.nom,
            detalls: this.detalls,
            num: this.num
        };
        return Promise.resolve(dades);
    }
}
exports.Producta = Producta;
