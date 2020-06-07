import { Usuaris } from "./usuaris/Usuaris";
const usuaris = new Usuaris();

import { Tenda } from "./economia/Tenda";
const tenda = new Tenda(usuaris);

import { Bot } from "./bot/Bot";
import { Message, Channel, Collector, MessageEmbed, DMChannel } from "discord.js";
import { Usuari } from "./usuaris/Usuari";

import { red } from "colors";


export const bot: Bot = new Bot("bot!");


bot.afegirEvent("message","hola", async (contingut: string[], msg: Message)=>{
    msg.channel.send("HOLA");
});


bot.afegirEvent("message","donarme", async (cont: string[], msg: Message)=>{
    let n: number = parseInt(cont[0]);
    await usuaris.agafar();

    let usuari: Usuari | undefined = usuaris.get(msg.author.tag);
    console.table(usuari);

    if(usuari){
        usuari.sumarDiners(n);
        msg.channel.send(`Diners Actuals: ${usuari.diners}`);
        await usuaris.guardar();
    }else{
        msg.channel.send(`Error en agafar usuari`)
    }
})


bot.afegirEvent("message","nou", async (cont: string[], msg: Message)=>{
    await usuaris.agafar();
    await usuaris.nouUsuari(msg.author.id);

    console.table(usuaris.get(msg.author.tag));

    await usuaris.guardar();

    msg.channel.send(`${msg.author.tag} s'ha creac una contap `);
})


bot.afegirEvent("message","conta", async (cont: string[], msg: Message)=>{
    await usuaris.agafar();
    let usuari: Usuari | undefined;

    if(cont[0]){
        usuari = await usuaris.getById(cont[0]);
    }else{
        usuari = await usuaris.getById(msg.author.id);
    }

    if(usuari){
        msg.channel.send(`${usuari.tag}`, {tts:true});
    }else{
        msg.channel.send(`Eror`);
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

bot.afegirEvent("message", "agafar-conta", async(cont: string[], msg: Message)=>{

    if(cont[0]){
        
    }else{

    }
})