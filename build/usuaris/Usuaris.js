"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDades_1 = require("../database/BaseDades");
const Usuari_1 = require("./Usuari");
class Usuaris {
    constructor() {
        this.llista = new Map();
        this.baseDades = new BaseDades_1.BaseDades("data");
    }
    cargarLlista() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.baseDades.agafar();
            const data = this.baseDades.json;
            for (let dataUsuari in data) {
                let usuari = new Usuari_1.Usuari(data[dataUsuari]);
                this.llista.set(usuari.id, usuari);
            }
        });
    }
    guardarUsuaris() {
        return __awaiter(this, void 0, void 0, function* () {
            let json = this.baseDades.json;
            this.llista.forEach((usuari, id) => {
                json[id] = usuari.agafarDadesUsuari();
            });
            this.baseDades.json = json;
            yield this.baseDades.guardar();
        });
    }
    nouUsuari(usuari) {
        return __awaiter(this, void 0, void 0, function* () {
            this.llista.set(usuari.id, usuari);
            yield this.guardarUsuaris();
        });
    }
}
exports.Usuaris = Usuaris;
