"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bot_1 = require("./bot/Bot");
const Usuaris_1 = require("./usuaris/Usuaris");
const Tenda_1 = require("./economia/Tenda");
const WareWolf_1 = require("./warewolf/WareWolf");
class CoinBot extends Bot_1.Bot {
    constructor(cridar, cargar) {
        super(cridar, cargar);
        this.usuaris = new Usuaris_1.Usuaris();
        this.tenda = new Tenda_1.Tenda(this.usuaris);
        this.warewolf = new WareWolf_1.WareWolf([]);
    }
    async cargarTot(cargartot) {
        if (cargartot) {
            await this.usuaris.agafar(this);
        }
        else {
            await this.usuaris.agafar();
        }
        await this.tenda.agafar();
    }
    async guardarTot() {
        await this.usuaris.guardar();
        await this.tenda.guardar();
    }
}
exports.CoinBot = CoinBot;
