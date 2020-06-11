"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDades_1 = require("./database/BaseDades");
const Usuari_1 = require("./usuaris/Usuari");
const Usuaris_1 = require("./usuaris/Usuaris");
const Objecta_1 = require("./economia/objectes/Objecta");
const Inventori_1 = require("./usuaris/Inventori");
const Separador_1 = require("./bot/compilador/Separador");
const Command_1 = require("./bot/esdeveniments/Command");
const discord_js_1 = require("discord.js");
const Tenda_1 = require("./economia/Tenda");
async function probaBD() {
    const d = new BaseDades_1.BaseDades("proba");
    await d.agafar();
    d.json.hola = "si";
    await d.guardar();
}
async function probaUis() {
    let users = new Usuaris_1.Usuaris();
    await users.agafar();
    let usuari = users.get("409313183027953664");
    if (usuari) {
        usuari.sumarDiners(10);
        console.table(await usuari.agafarDadesUsuari());
        await users.guardar();
    }
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
        id: "Jugador2",
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
        id: "cesc",
        diners: 20,
        banc: 30
    };
    let dataInv = {
        id: "cesc",
        objectes: {
            Nose: obj1,
            "Nose Algo": obj2
        }
    };
    let usuari = new Usuari_1.Usuari(new discord_js_1.User(new discord_js_1.Client(), {}), dataUsu, dataInv);
    let obj = usuari.inventori.objectes.Nose;
    console.table(obj.nom);
}
async function probaUsus() {
    let usuaris = new Usuaris_1.Usuaris();
    await usuaris.agafar();
    console.table(usuaris);
}
async function sandbox1() {
    let obj1 = new Objecta_1.Objecta("AAAA", 100, "CRIDA!!! AAAAAAA!!!!!");
    let obj2 = new Objecta_1.Objecta("MES ALT", 10, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!!!!!!!!!!");
    const usuaris = new Usuaris_1.Usuaris();
    await usuaris.agafar();
    let dataUsu = {
        id: "cesc",
        diners: 20,
        banc: 30
    };
    let dataInv = {
        id: "cesc",
        objectes: {
            "AAAA": obj1,
            "MES ALT": obj2
        }
    };
    let nouUsuari = new Usuari_1.Usuari(new discord_js_1.User(new discord_js_1.Client, {}), dataUsu, dataInv);
    console.table(nouUsuari);
    await usuaris.nouUsuari("TAG", new discord_js_1.User(new discord_js_1.Client(), {}));
    let usuari = usuaris.get("cesc");
    if (usuari) {
        console.table(usuari.inventori.objectes.AAAA);
    }
    else {
        console.log("undefined");
    }
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
async function probaUsus_2() {
    let usuaris = new Usuaris_1.Usuaris();
    await usuaris.agafar();
    let usuari = usuaris.get("Cesc");
    if (usuari) {
        usuari.sumarDiners(20);
    }
    await usuaris.guardar();
}
async function probaTend() {
    let usuaris = new Usuaris_1.Usuaris();
    await usuaris.agafar();
    let tenda = new Tenda_1.Tenda(usuaris);
    await tenda.agafar();
    let usuari = usuaris.get("Cesc");
    let obj = new Objecta_1.Objecta("A", 2, "ningun");
    if (usuari) {
        await tenda.nouProducta(obj, usuari, 10);
        await tenda.guardar();
    }
}
async function probaTend_2() {
    let usuaris = new Usuaris_1.Usuaris();
    await usuaris.agafar();
    let tenda = new Tenda_1.Tenda(usuaris);
    await tenda.agafar();
    let usuari = usuaris.get("Cesc");
    console.table(usuari);
    let producta = tenda.get("A");
    if (producta && usuari) {
        if (producta.comprar(usuari, 1)) {
            console.log("Comprat");
        }
        console.table(producta);
        tenda.set(producta.nom, producta);
        await tenda.guardar();
    }
}
probaTend_2();
