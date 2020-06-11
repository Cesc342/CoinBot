import { Bot } from "./bot/Bot";
import { Usuaris } from "./usuaris/Usuaris";
import { Tenda } from "./economia/Tenda";

import { Message, Channel, Collector, MessageEmbed, DMChannel, Client, User } from "discord.js";
import { red } from "colors";
import { Compilador } from "./bot/compilador/Compilador";
import { Objecta } from "./economia/objectes/Objecta";


const usuaris = new Usuaris();
const tenda = new Tenda(usuaris);
const compilador = new Compilador();

export const bot: Bot = new Bot("bot!", async ()=>{
    await usuaris.agafar(bot);
    await tenda.agafar();
});



bot.afegirEvent("message", "crear", async (con: string[], msg: Message)=>{
    await usuaris.agafar();

    if(con[0]){
        let id: string = await compilador.treuraId(con[0]);
        let usuari: User | undefined = await bot.users.fetch(id);
        if(usuari){
            usuaris.nouUsuari(id, usuari);
        }else{
            msg.channel.send(`No s'ha trobat l'usuari ${con[0]}`);
        }
    }else{
        let usuari: User = msg.author;
        usuaris.nouUsuari(usuari.id, usuari);
    }

    await usuaris.guardar();
    await usuaris.agafar(bot);
});


bot.afegirEvent("message", "stats", async (cont: string[], msg: Message)=>{
    await usuaris.agafar();

    let usuari = await usuaris.getById(msg.author.id);

    if(usuari){
        msg.channel.send(`
        > Nom: ${usuari.username}
        > Diners:
        > - Metàlic: ${usuari.diners}
        > - Banc: ${usuari.banc}`)
    }
})

bot.afegirEvent("message", "mirar", (cont:string[], msg: Message)=>{
    if(cont[0]){
        msg.channel.send(cont[0]);
    }
})


bot.afegirEvent("message", "tenda", async (cont: string[], msg: Message)=>{
    await tenda.agafar();
    console.table(tenda);
    let txt = await tenda.outTenda();
    msg.channel.send(txt);
});

bot.afegirEvent("message", "nou", async (cont, msg)=>{
    await tenda.agafar();
    await usuaris.agafar();

    if(cont[0]){
        let obj = new Objecta("cosa",2,"Cap");
        let usuari = await usuaris.getAsync(msg.author.id);

        if(usuari){
            await tenda.nouProducta(obj, usuari, parseInt(cont[0]));
            msg.channel.send("S'ha creat el nou producta");
        }
    }

    await tenda.guardar();
    await usuaris.guardar();
})