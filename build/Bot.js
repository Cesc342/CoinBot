"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Usuaris_1 = require("./usuaris/Usuaris");
const usuaris = new Usuaris_1.Usuaris();
const Bot_1 = require("./bot/Bot");
exports.bot = new Bot_1.Bot("bot!");
exports.bot.afegirEvent("message", "hola", async (contingut, msg) => {
    msg.reply("HOLA");
});
exports.bot.afegirEvent("message", "donarme", async (cont, msg) => {
    let n = parseInt(cont[0]);
    await usuaris.agafar();
    let usuari = usuaris.llista[msg.author.tag];
    console.table(usuari);
    usuari.sumarDiners(n);
    msg.reply(`Diners Actuals: ${usuari.diners}`);
    await usuaris.guardar();
});
exports.bot.afegirEvent("message", "nou", async (cont, msg) => {
    await usuaris.agafar();
    usuaris.nouUsuari(msg.author.id);
    console.table(usuaris.llista[msg.author.tag]);
    await usuaris.guardar();
    msg.channel.send(`${msg.author.tag} s'ha creac una contap `);
});
exports.bot.afegirEvent("message", "conta", async (cont, msg) => {
    await usuaris.agafar();
    let usuari;
    if (cont[0]) {
        usuari = usuaris.llista[cont[0]];
    }
    else {
        usuari = usuaris.llista[msg.author.tag];
    }
    if (usuari) {
        msg.channel.send(`${usuari.tag}`, { tts: true });
    }
    else {
        msg.channel.send(`El usuari`);
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
