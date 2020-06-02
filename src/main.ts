import { Usuaris } from "./usuaris/Usuaris";
const usuaris = new Usuaris();

import { Bot } from "./bot/Bot";
const bot: Bot = new Bot("bot!");

import { green } from "colors";
import { Message, ClientUser } from "discord.js";



async function __main()
{
    console.log(green("Cargan el Bot:"))

    bot.onMissatge(("hola"),async (contingut: string[], msg: Message)=>{
        let user: ClientUser | null = bot.user;
        let tag: string = "";
        if(user){
            tag = user.tag;
        }
        msg.reply(`Hola ${msg.author.tag}, soc ${bot.usuari.tag}`);
    })

    console.log(green("--> Bot Preparat"));

    await bot.login("");
    console.log(green(`--> Ha iniciat la sessio`));

    await bot.prepararBot();
    console.log(green(`--> Bot Cargat`))
}

__main();