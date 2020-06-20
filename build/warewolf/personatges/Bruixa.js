"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Personatge_1 = require("./Personatge");
class Bruixa extends Personatge_1.Personatge {
    constructor(usuari, warewolf) {
        super(usuari, "bruixa", "Bruixa AAAAAAAAAAAAAAAA", warewolf);
        this.rol = "bruixa";
        this.torn = false;
        this.curar = true;
        this.matar = true;
        this.cargarAccio();
    }
    cargarAccio() {
        let event = async (cont, msg) => {
            if (!this.mort && cont[0] && cont[1]) {
                let triat = await this.warewolf.getById(cont[1]);
                if (triat) {
                    if (cont[0] == "m" || cont[0] == "matar") {
                        triat.mort = true;
                        this.matar = false;
                        return false;
                    }
                    else if (cont[0] == "r" || cont[0] == "reviure") {
                        triat.mort = false;
                        this.curar = false;
                        return false;
                    }
                }
                return true;
            }
            return true;
        };
        this.ficarEvent(event);
    }
}
exports.Bruixa = Bruixa;
