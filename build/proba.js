"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDades_1 = require("./database/BaseDades");
const Usuari_1 = require("./usuaris/Usuari");
const Usuaris_1 = require("./usuaris/Usuaris");
async function probaBD() {
    const d = new BaseDades_1.BaseDades("proba");
    await d.agafar();
    d.json.hola = "si";
    await d.guardar();
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
async function probaUis() {
    let users = new Usuaris_1.Usuaris();
    await users.cargarLlista();
    await users.guardarUsuaris();
    console.table(users.llista.get("<@!409313183027953664>"));
}
function proba1(hola) {
    return hola;
}
console.log(proba1(9));
