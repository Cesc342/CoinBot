"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Personatge_1 = require("./Personatge");
class Llob extends Personatge_1.Personatge {
    constructor(usuari, warewolf, seguent) {
        super(usuari, "llob", warewolf);
        this.rol = "llob";
        this.cargarAccio();
        this.seguent = seguent;
    }
    async cargarAccio() {
        let event = async (cont, msg) => {
            if (!this.mort && cont[0]) {
                let usuari = await this.warewolf.getById(cont[0]);
                if (usuari) {
                    usuari.potMorir = true;
                    return false;
                }
            }
            return true;
        };
        this.ficarEvent(event);
    }
}
exports.Llob = Llob;
