"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Usuaris_1 = require("./usuaris/Usuaris");
const usuaris = new Usuaris_1.Usuaris();
const Tenda_1 = require("./economia/Tenda");
const tenda = new Tenda_1.Tenda(usuaris);
const Bot_1 = require("./bot/Bot");
exports.bot = new Bot_1.Bot("bot!");
exports.bot.afegirEvent("message", "hola", async (contingut, msg) => {
    msg.channel.send("HOLA");
});
exports.bot.afegirEvent("message", "donarme", async (cont, msg) => {
    let n = parseInt(cont[0]);
    await usuaris.agafar();
    let usuari = usuaris.get(msg.author.tag);
    console.table(usuari);
    if (usuari) {
        usuari.sumarDiners(n);
        msg.channel.send(`Diners Actuals: ${usuari.diners}`);
        await usuaris.guardar();
    }
    else {
        msg.channel.send(`Error en agafar usuari`);
    }
});
exports.bot.afegirEvent("message", "nou", async (cont, msg) => {
    await usuaris.agafar();
    await usuaris.nouUsuari(msg.author.id);
    console.table(usuaris.get(msg.author.tag));
    await usuaris.guardar();
    msg.channel.send(`${msg.author.tag} s'ha creac una contap `);
});
exports.bot.afegirEvent("message", "conta", async (cont, msg) => {
    await usuaris.agafar();
    let usuari;
    if (cont[0]) {
        usuari = await usuaris.getById(cont[0]);
    }
    else {
        usuari = await usuaris.getById(msg.author.id);
    }
    if (usuari) {
        msg.channel.send(`${usuari.tag}`, { tts: true });
    }
    else {
        msg.channel.send(`Eror`);
    }
});
exports.bot.afegirEvent("message", "adeu", async (cont, msg) => {
    let channelDm = await msg.author.createDM();
    channelDm.send("NO");
    channelDm.send("Sé on vius i mai podras escapar de mi");
    channelDm.send("I si ho fas mai et podras escapar de facebook");
});
exports.bot.afegirEvent("message", "proba", async (cont, msg) => {
    console.log(cont[0]);
    msg.channel.send(cont[0]);
});
exports.bot.afegirEvent("message", "agafar-conta", async (cont, msg) => {
    if (cont[0]) {
    }
    else {
    }
});
