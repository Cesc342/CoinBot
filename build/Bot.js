"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bot_1 = require("./bot/Bot");
const Usuaris_1 = require("./usuaris/Usuaris");
const Tenda_1 = require("./economia/Tenda");
const Compilador_1 = require("./bot/compilador/Compilador");
const Objecta_1 = require("./economia/objectes/Objecta");
const usuaris = new Usuaris_1.Usuaris();
const tenda = new Tenda_1.Tenda(usuaris);
const compilador = new Compilador_1.Compilador();
exports.bot = new Bot_1.Bot("bot!", async () => {
    await usuaris.agafar(exports.bot);
    await tenda.agafar();
});
exports.bot.afegirEvent("message", "crear", async (con, msg) => {
    await usuaris.agafar();
    if (con[0]) {
        let id = await compilador.treuraId(con[0]);
        let usuari = await exports.bot.users.fetch(id);
        if (usuari) {
            usuaris.nouUsuari(id, usuari);
        }
        else {
            msg.channel.send(`No s'ha trobat l'usuari ${con[0]}`);
        }
    }
    else {
        let usuari = msg.author;
        usuaris.nouUsuari(usuari.id, usuari);
    }
    await usuaris.guardar();
    await usuaris.agafar(exports.bot);
});
exports.bot.afegirEvent("message", "stats", async (cont, msg) => {
    await usuaris.agafar();
    let usuari = await usuaris.getById(msg.author.id);
    if (usuari) {
        msg.channel.send(`
        > Nom: ${usuari.username}
        > Diners:
        > - Metàlic: ${usuari.diners}
        > - Banc: ${usuari.banc}`);
    }
});
exports.bot.afegirEvent("message", "mirar", (cont, msg) => {
    if (cont[0]) {
        msg.channel.send(cont[0]);
    }
});
exports.bot.afegirEvent("message", "tenda", async (cont, msg) => {
    await tenda.agafar();
    console.table(tenda);
    let txt = await tenda.outTenda();
    msg.channel.send(txt);
});
exports.bot.afegirEvent("message", "nou", async (cont, msg) => {
    await tenda.agafar();
    await usuaris.agafar();
    if (cont[0]) {
        let obj = new Objecta_1.Objecta("cosa", 2, "Cap");
        let usuari = await usuaris.getAsync(msg.author.id);
        if (usuari) {
            await tenda.nouProducta(obj, usuari, parseInt(cont[0]));
            msg.channel.send("S'ha creat el nou producta");
        }
    }
    await tenda.guardar();
    await usuaris.guardar();
});
