"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Personatge_1 = require("./Personatge");
class Pobla extends Personatge_1.Personatge {
    constructor(usuari, warewolf) {
        super(usuari, "pobla", warewolf);
        this.rol = "pobla";
    }
}
exports.Pobla = Pobla;
