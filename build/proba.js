"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDades_1 = require("./database/BaseDades");
const Usuari_1 = require("./usuaris/Usuari");
const Usuaris_1 = require("./usuaris/Usuaris");
const Objecta_1 = require("./usuaris/objectes/Objecta");
const Inventori_1 = require("./usuaris/objectes/Inventori");
const Separador_1 = require("./bot/Separador");
const Command_1 = require("./bot/Command");
async function probaBD() {
    const d = new BaseDades_1.BaseDades("proba");
    await d.agafar();
    d.json.hola = "si";
    await d.guardar();
}
async function probaUis() {
    let users = new Usuaris_1.Usuaris();
    await users.agafar();
    await users.guardar();
    console.table(users.llista.get("<@!409313183027953664>"));
}
function proba1(hola) {
    return hola;
}
function probaObj() {
    let obj = new Objecta_1.Objecta("Algo", 100, "No fa res i punto.");
    console.log(obj.gastar(50));
    console.log(obj);
    console.table(obj);
}
function probaInv() {
    let obj1 = new Objecta_1.Objecta("Nose", 100, "No ho se. Tu sabras.");
    let obj2 = new Objecta_1.Objecta("Nose Algo", 10, "Nose, potser aquest fa algo. Tiu, no ho se tot.");
    let inventori = new Inventori_1.Inventori({
        tag: "Jugador2",
        objectes: {
            "Nose": obj1,
            "Nose Algo": obj2
        }
    });
    console.table(inventori.objectes);
    let algo = inventori.objectes;
    console.log(`Objecta:
    Nom: ${algo.nom},
    Numero en el inventori: ${algo.num},
    Detalls: ${algo.detalls}`);
    console.log();
    console.log(JSON.stringify(inventori.agafarInventori()));
}
async function probaUsu() {
    let obj1 = new Objecta_1.Objecta("Nose", 100, "No ho se. Tu sabras.");
    let obj2 = new Objecta_1.Objecta("Nose Algo", 10, "Nose, potser aquest fa algo. Tiu, no ho se tot.");
    let dataUsu = {
        tag: "cesc",
        diners: 20,
        banc: 30
    };
    let dataInv = {
        tag: "cesc",
        objectes: {
            Nose: obj1,
            "Nose Algo": obj2
        }
    };
    let usuari = new Usuari_1.Usuari(dataUsu, dataInv);
    let obj = usuari.inventori.objectes.Nose;
    console.table(obj.nom);
}
async function probaUsus() {
    let usuaris = new Usuaris_1.Usuaris();
    await usuaris.agafar();
    console.table(usuaris.llista);
}
async function sandbox1() {
    let obj1 = new Objecta_1.Objecta("AAAA", 100, "CRIDA!!! AAAAAAA!!!!!");
    let obj2 = new Objecta_1.Objecta("MES ALT", 10, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!!!!!!!!!!");
    const usuaris = new Usuaris_1.Usuaris();
    await usuaris.agafar();
    let dataUsu = {
        tag: "cesc",
        diners: 20,
        banc: 30
    };
    let dataInv = {
        tag: "cesc",
        objectes: {
            "AAAA": obj1,
            "MES ALT": obj2
        }
    };
    let nouUsuari = new Usuari_1.Usuari(dataUsu, dataInv);
    console.table(nouUsuari);
    await usuaris.nouUsuari("TAG");
    let usuari = usuaris.llista["cesc"];
    console.table(usuari.inventori.objectes.AAAA);
}
async function probaSep() {
    let separador = new Separador_1.Separador("bot!");
    await separador.separarMissatge("bot!a tot no le");
    console.table(separador);
}
async function probaCom() {
    let command = new Command_1.Command("a", async (contingut, msg) => {
        console.log(contingut[0]);
        console.log(msg);
    });
    // command.on(["hola"],"aa");   // No es pot probar almenys que canviis unes coses del arxiu
    // Això es perque on fica "aa" tindria de haver una variable de type :Message de discord
}
probaCom();
