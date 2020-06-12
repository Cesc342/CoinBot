"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Compilador_1 = require("./bot/compilador/Compilador");
const Objecta_1 = require("./economia/objectes/Objecta");
const CoinBot_1 = require("./CoinBot");
const compilador = new Compilador_1.Compilador();
exports.coinBot = new CoinBot_1.CoinBot("bot!", async () => {
    exports.coinBot.cargarTot(true);
});
exports.coinBot.afegirEvent("message", "veura", async (con, msg) => {
    console.log(msg.author.id);
    let usuari = await exports.coinBot.users.fetch(msg.author.id);
    if (usuari) {
        msg.channel.send(usuari.username);
    }
});
exports.coinBot.afegirEvent("message", "crear", async (con, msg) => {
    await exports.coinBot.usuaris.agafar();
    if (con[0]) {
        let id = await compilador.treuraId(con[0]);
        let usuari = await exports.coinBot.users.fetch(id);
        if (usuari) {
            exports.coinBot.usuaris.nouUsuari(id, usuari);
        }
        else {
            msg.channel.send(`No s'ha trobat l'usuari ${con[0]}`);
        }
    }
    else {
        let usuari = msg.author;
        exports.coinBot.usuaris.nouUsuari(usuari.id, usuari);
    }
    await exports.coinBot.usuaris.guardar();
    await exports.coinBot.usuaris.agafar(exports.coinBot);
});
exports.coinBot.afegirEvent("message", "stats", async (cont, msg) => {
    await exports.coinBot.usuaris.agafar();
    let usuari = await exports.coinBot.usuaris.getById(msg.author.id);
    if (usuari) {
        msg.channel.send(`
        > Nom: ${usuari.username}
        > Diners:
        > - Metàlic: ${usuari.diners}
        > - Banc: ${usuari.banc}`);
    }
});
exports.coinBot.afegirEvent("message", "mirar", (cont, msg) => {
    if (cont[0]) {
        msg.channel.send(cont[0]);
    }
});
exports.coinBot.afegirEvent("message", "tenda", async (cont, msg) => {
    await exports.coinBot.tenda.agafar();
    console.table(exports.coinBot.tenda);
    let txt = await exports.coinBot.tenda.outTenda();
    msg.channel.send(txt);
});
exports.coinBot.afegirEvent("message", "nou", async (cont, msg) => {
    await exports.coinBot.cargarTot();
    if (cont[0]) {
        let obj = new Objecta_1.Objecta("cosa", 2, "Cap");
        let usuari = await exports.coinBot.usuaris.getAsync(msg.author.id);
        if (usuari) {
            await exports.coinBot.tenda.nouProducta(obj, usuari, parseInt(cont[0]));
            msg.channel.send("S'ha creat el nou producta");
        }
    }
    await exports.coinBot.guardarTot();
});
