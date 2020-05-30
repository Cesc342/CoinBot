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
const BaseDades_1 = require("./database/BaseDades");
const Usuari_1 = require("./usuaris/Usuari");
const Usuaris_1 = require("./usuaris/Usuaris");
function probaBD() {
    return __awaiter(this, void 0, void 0, function* () {
        const d = new BaseDades_1.BaseDades("proba");
        yield d.agafar();
        d.json.hola = "si";
        yield d.guardar();
    });
}
function probaUi() {
    const u = new Usuari_1.Usuari({
        id: "Cesc",
        diners: 50,
        banc: 10
    });
    u.sumarDiners(15);
    console.log(u.treuraBanc(-5));
    console.table(u);
}
function probaUis() {
    return __awaiter(this, void 0, void 0, function* () {
        let users = new Usuaris_1.Usuaris();
        yield users.cargarLlista();
        yield users.guardarUsuaris();
        console.table(users.llista.get("<@!409313183027953664>"));
    });
}
function proba1(hola) {
    return hola;
}
console.log(proba1(9));
