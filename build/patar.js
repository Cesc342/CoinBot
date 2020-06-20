"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bot_1 = require("./bot/Bot");
const bot = new Bot_1.Bot("ww!", () => {
    console.log("CONNECTAT");
});
bot.afegirEvent("message", "hola", (cont, msg) => {
    msg.reply("Hola");
});
bot.login("NzE2MDA2NDE2NjczOTMxMzg1.Xu01GA.MlG4Kr8GnFaQVnLe3cOYGwORTUI");
