"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Personatge_1 = require("./Personatge");
class Cupido extends Personatge_1.Personatge {
    constructor(usuari, warewolf, seguent) {
        super(usuari, "Cupido", warewolf);
        this.rol = "cupido";
        this.noHaTriat = false;
        this.accio();
        this.seguent = seguent;
    }
    async accio() {
        let event = async (cont, msg) => {
            if (this.noHaTriat) {
                if (cont[0] && cont[1] && !this.mort) {
                    this.noHaTriat = false;
                    let enamorat_1 = await this.warewolf.getById(cont[0]);
                    let enamorat_2 = await this.warewolf.getById(cont[1]);
                    if (enamorat_1 && enamorat_2) {
                        enamorat_1.enamorat = enamorat_2;
                        enamorat_2.enamorat = enamorat_1;
                        console.log("ENAMORATS");
                        console.log(`${enamorat_1.usuari.username}`);
                        console.log(`${enamorat_2.usuari.username}`);
                        return false;
                    }
                }
            }
            else {
                this.next();
            }
            return true;
        };
        this.ficarEvent(event);
    }
}
exports.Cupido = Cupido;
