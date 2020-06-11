"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bot_1 = require("./bot/Bot");
const Usuaris_1 = require("./usuaris/Usuaris");
const Tenda_1 = require("./economia/Tenda");
const Compilador_1 = require("./bot/compilador/Compilador");
const usuaris = new Usuaris_1.Usuaris();
const tenda = new Tenda_1.Tenda(usuaris);
const compilador = new Compilador_1.Compilador();
exports.bot = new Bot_1.Bot("bot!", () => {
    usuaris.agafar(exports.bot);
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
});
