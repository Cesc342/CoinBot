import { Usuaris } from "./Usuaris";
const usuaris = new Usuaris();

import { Bot } from "./Bot";
const bot: Bot = new Bot("bot!");

import { green } from "colors";

async function __main()
{
    console.log(green("Cargan el Bot:"))

    await bot.prepararBot();
    console.log(green(`--> Bot Preparat`))

    await bot.login("");
    console.log(green(`--> Ha iniciat la sessio`));
}

__main();
