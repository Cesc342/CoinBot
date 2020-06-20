"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Personatge_1 = require("./Personatge");
class Pobla extends Personatge_1.Personatge {
    constructor(usuari) {
        super(usuari, "Descripcio");
        this.votacions = 0;
    }
}
exports.Pobla = Pobla;
