"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Personatge_1 = require("./Personatge");
class Cupido extends Personatge_1.Personatge {
    constructor(usuari, warewolf) {
        super(usuari, "Cupido", "Cupido", warewolf);
        this.rol = "cupido";
        this.jaTriat = false;
    }
    async accio() {
        let event = async (cont, msg) => {
            if (this.jaTriat) {
                if (cont[0] && cont[1] && !this.mort) {
                    this.jaTriat = false;
                    let enamorat_1 = await this.warewolf.getById(cont[0]);
                    let enamorat_2 = await this.warewolf.getById(cont[1]);
                    if (enamorat_1 && enamorat_2) {
                        enamorat_1.enamorat = enamorat_2;
                        enamorat_2.enamorat = enamorat_1;
                        return false;
                    }
                }
            }
            return true;
        };
        this.ficarEvent(event);
    }
}
exports.Cupido = Cupido;
