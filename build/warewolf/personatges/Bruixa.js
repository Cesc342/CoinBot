"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Personatge_1 = require("./Personatge");
class Bruixa extends Personatge_1.Personatge {
    constructor(usuari, warewolf) {
        super(usuari, "bruixa", warewolf);
        this.rol = "bruixa";
        this.torn = false;
        this.curar = true;
        this.matar = true;
        this.cargarAccio();
        this.puntsForts = "``Pot reviure a una persona o prendre la vida d'una altre si sospita que és el llop.``";
        this.puntsFebles = "``Només té dos pocions durant tota la partida i quan se li gasten passa a ser part del poble``";
        this.urlImatge = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FRihvg4GvKqU%2Fmaxresdefault.jpg&f=1&nofb=1";
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
