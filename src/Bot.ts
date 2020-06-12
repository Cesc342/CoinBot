import { Bot } from "./bot/Bot";

import { Message, Channel, Collector, MessageEmbed, DMChannel, Client, User } from "discord.js";
import { red } from "colors";
import { Compilador } from "./bot/compilador/Compilador";
import { Objecta } from "./economia/objectes/Objecta";
import { CoinBot } from "./CoinBot";


const compilador = new Compilador();

export const coinBot: CoinBot = new CoinBot("bot!", async ()=>{
    coinBot.cargarTot(true);
});

coinBot.afegirEvent("message", "veura", async (con, msg)=>{
    console.log(msg.author.id);
    let usuari = await coinBot.users.fetch(msg.author.id);

    if(usuari){
        msg.channel.send(usuari.username);
    }

})

coinBot.afegirEvent("message", "crear", async (con: string[], msg: Message)=>{
    await coinBot.usuaris.agafar();

    if(con[0]){
        let id: string = await compilador.treuraId(con[0]);
        let usuari: User | undefined = await coinBot.users.fetch(id);
        if(usuari){
            coinBot.usuaris.nouUsuari(id, usuari);
        }else{
            msg.channel.send(`No s'ha trobat l'usuari ${con[0]}`);
        }
    }else{
        let usuari: User = msg.author;
        coinBot.usuaris.nouUsuari(usuari.id, usuari);
    }

    await coinBot.usuaris.guardar();
    await coinBot.usuaris.agafar(coinBot);
});


coinBot.afegirEvent("message", "stats", async (cont: string[], msg: Message)=>{
    await coinBot.usuaris.agafar();

    let usuari = await coinBot.usuaris.getById(msg.author.id);

    if(usuari){
        msg.channel.send(`
        > Nom: ${usuari.username}
        > Diners:
        > - Metàlic: ${usuari.diners}
        > - Banc: ${usuari.banc}`)
    }
})

coinBot.afegirEvent("message", "mirar", (cont:string[], msg: Message)=>{
    if(cont[0]){
        msg.channel.send(cont[0]);
    }
})


coinBot.afegirEvent("message", "tenda", async (cont: string[], msg: Message)=>{
    await coinBot.tenda.agafar();
    console.table(coinBot.tenda);
    let txt = await coinBot.tenda.outTenda();
    msg.channel.send(txt);
});

coinBot.afegirEvent("message", "nou", async (cont, msg)=>{
    await coinBot.cargarTot();

    if(cont[0]){
        let obj = new Objecta("cosa",2,"Cap");
        let usuari = await coinBot.usuaris.getAsync(msg.author.id);

        if(usuari){
            await coinBot.tenda.nouProducta(obj, usuari, parseInt(cont[0]));
            msg.channel.send("S'ha creat el nou producta");
        }
    }

    await coinBot.guardarTot();
});
