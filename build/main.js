"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Usuaris_1 = require("./usuaris/Usuaris");
const usuaris = new Usuaris_1.Usuaris();
const Bot_1 = require("./bot/Bot");
const bot = new Bot_1.Bot("bot!");
const colors_1 = require("colors");
async function __main() {
    console.log(colors_1.green("Cargan el Bot:"));
    bot.onMissatge(("hola"), async (contingut, msg) => {
        let user = bot.user;
        let tag = "";
        if (user) {
            tag = user.tag;
        }
        msg.reply(`Hola ${msg.author.tag}, soc ${bot.usuari.tag}`);
    });
    console.log(colors_1.green("--> Bot Preparat"));
    await bot.login("");
    console.log(colors_1.green(`--> Ha iniciat la sessio`));
    await bot.prepararBot();
    console.log(colors_1.green(`--> Bot Cargat`));
}
__main();
