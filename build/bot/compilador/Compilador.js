"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Compilador {
    constructor() {
    }
    async treuraId(idBrut) {
        let id;
        if (idBrut.includes("!")) {
            id = idBrut.split("!")[1].split(">")[0];
        }
        else if (idBrut.includes("@")) {
            id = idBrut.split("@")[1].split(">")[0];
        }
        else {
            return idBrut;
        }
        return id;
    }
    async treuraNom(nomBrut) {
        let nom = "";
        nom = nomBrut.split("#")[0];
        return nom;
    }
}
exports.Compilador = Compilador;
