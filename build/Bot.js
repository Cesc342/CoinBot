"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bot_1 = require("./bot/Bot");
const Usuaris_1 = require("./usuaris/Usuaris");
const Tenda_1 = require("./economia/Tenda");
const usuaris = new Usuaris_1.Usuaris();
const tenda = new Tenda_1.Tenda(usuaris);
exports.bot = new Bot_1.Bot("bot!", () => {
    usuaris.agafar(exports.bot);
});
exports.bot.afegirEvent("message", "agafar", async (contingut, msg) => {
    await usuaris.agafar();
    console.table(usuaris);
    console.log(msg.author.id);
    let usuari = await usuaris.getById(msg.author.id);
    if (usuari) {
        msg.channel.send(`El teu tag es ${usuari.tag}`);
    }
    else {
        msg.channel.send("No s'ha trobat");
    }
});
exports.bot.afegirEvent("message", "nou", async (cont, msg) => {
    await usuaris.agafar();
    let usuari = await exports.bot.users.fetch(msg.author.id);
    usuari = await usuaris.nouUsuari(msg.author.id, usuari);
    msg.channel.send(`S'ha creat la conta de ${usuari.username}`);
    await usuaris.agafar(exports.bot);
});
exports.bot.afegirEvent("message", "potser", async (cont, msg) => {
    let usuari = await exports.bot.users.fetch(msg.author.id);
    console.log(msg.author.id);
    msg.channel.send(`--> ${usuari.tag}`);
});
exports.bot.afegirEvent("message", "hola", async (cont, msg) => {
    await usuaris.agafar();
    let usuari = usuaris.get(msg.author.id);
    if (usuari) {
        usuari.send("Hola");
    }
});
