import { Bot } from "./bot/Bot";
import { Usuaris } from "./usuaris/Usuaris";
import { Usuari } from "./usuaris/Usuari";
import { Tenda } from "./economia/Tenda";

import { Message, Channel, Collector, MessageEmbed, DMChannel, Client } from "discord.js";
import { red } from "colors";


const usuaris = new Usuaris();
const tenda = new Tenda(usuaris);

export const bot: Bot = new Bot("bot!", ()=>{
    usuaris.agafar(bot);
});



bot.afegirEvent("message","agafar", async (contingut: string[], msg: Message)=>{
    await usuaris.agafar();

    console.table(usuaris);
    console.log(msg.author.id);
    let usuari = await usuaris.getById(msg.author.id);

    if(usuari){
        msg.channel.send(`El teu tag es ${usuari.tag}`);
    }else{
        msg.channel.send("No s'ha trobat")
    }
});


bot.afegirEvent("message", "nou", async (cont: string[], msg: Message)=>{
    await usuaris.agafar();

    let usuari = await bot.users.fetch(msg.author.id);
    usuari = await usuaris.nouUsuari(msg.author.id, usuari);

    msg.channel.send(`S'ha creat la conta de ${usuari.username}`);

    await usuaris.agafar(bot);
})


bot.afegirEvent("message", "potser", async (cont: string[], msg: Message)=>{
    let usuari = await bot.users.fetch(msg.author.id);

    console.log(msg.author.id);

    msg.channel.send(`--> ${usuari.tag}`);
})


bot.afegirEvent("message", "hola", async (cont: string[], msg: Message)=>{
    await usuaris.agafar();

    let usuari = usuaris.get(msg.author.id);

    if(usuari){
        usuari.send("Hola");
    }
})