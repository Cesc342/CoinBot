"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Personatge_1 = require("./Personatge");
class Llob extends Personatge_1.Personatge {
    constructor(usuari, warewolf) {
        super(usuari, "llob", "Descripcio", warewolf);
        this.rol = "llob";
    }
}
exports.Llob = Llob;
