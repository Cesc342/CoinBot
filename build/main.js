"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Usuaris_1 = require("./Usuaris");
const usuaris = new Usuaris_1.Usuaris();
const Bot_1 = require("./Bot");
const bot = new Bot_1.Bot("bot!");
const colors_1 = require("colors");
async function __main() {
    console.log(colors_1.green("Cargan el Bot:"));
    await bot.prepararBot();
    console.log(colors_1.green(`--> Bot Preparat`));
    await bot.login("");
    console.log(colors_1.green(`--> Ha iniciat la sessio`));
}
__main();
