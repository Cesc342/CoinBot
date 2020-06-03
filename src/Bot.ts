import { Usuaris } from "./usuaris/Usuaris";
const usuaris = new Usuaris();

import { Bot } from "./bot/Bot";
import { Message, Channel, Collector, MessageEmbed, DMChannel } from "discord.js";
import { Usuari } from "./usuaris/Usuari";

import { red } from "colors";


export const bot: Bot = new Bot("bot!");


bot.afegirEvent("message","hola", async (contingut: string[], msg: Message)=>{
    msg.reply("HOLA");
});


bot.afegirEvent("message","donarme", async (cont: string[], msg: Message)=>{
    let n: number = parseInt(cont[0]);
    await usuaris.agafar();

    let usuari: Usuari = usuaris.llista[msg.author.tag];
    console.table(usuari);

    usuari.sumarDiners(n);
    msg.reply(`Diners Actuals: ${usuari.diners}`);
    await usuaris.guardar();
})


bot.afegirEvent("message","nou", async (cont: string[], msg: Message)=>{
    await usuaris.agafar();
    usuaris.nouUsuari(msg.author.id);

    console.table(usuaris.llista[msg.author.tag]);

    await usuaris.guardar();

    msg.channel.send(`${msg.author.tag} s'ha creac una contap `);
})


bot.afegirEvent("message","conta", async (cont: string[], msg: Message)=>{
    await usuaris.agafar();
    let usuari: Usuari;

    if(cont[0]){
        usuari = usuaris.llista[cont[0]];
    }else{
        usuari = usuaris.llista[msg.author.tag];
    }

    if(usuari){
        msg.channel.send(`${usuari.tag}`, {tts:true});
    }else{
        msg.channel.send(`El usuari`);
    }
})

bot.afegirEvent("message", "adeu", async(cont: string[], msg: Message)=>{
    let channelDm: DMChannel = await msg.author.createDM();

    channelDm.send("NO");
    channelDm.send("Sé on vius i mai podras escapar de mi");
    channelDm.send("I si ho fas mai et podras escapar de facebook");
});

bot.afegirEvent("message", "proba", async(cont: string[], msg: Message)=>{
    console.log(cont[0]);
    msg.channel.send(cont[0]);
})