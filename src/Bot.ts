import { Bot } from "./bot/Bot";

import { Message, Channel, Collector, MessageEmbed, DMChannel, Client, User, DiscordAPIError } from "discord.js";
import { red } from "colors";
import { Compilador } from "./bot/compilador/Compilador";
import { Objecta } from "./economia/objectes/Objecta";
import { CoinBot } from "./CoinBot";
import { WareWolf } from "./warewolf/WareWolf";
import { config } from "process";


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
        let txt: string[] = [];
        txt[0] = `> Nom ${usuari.username};
        > Diners: ;
        > - Metàlic: ${usuari.diners}$;
        > - Banc: ${usuari.banc}$;
        > Inventori:`;

        let i = 0;
        usuari.inventori.forEach((obj, nom)=>{
            txt[1+i] = `> \`Nom: ${obj.nom}  Num: ${obj.num}
            > Detalls: ${obj.detalls} \``;
            i++;
        });

        msg.channel.send(txt);
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
        let usuari = await coinBot.usuaris.getAsync(msg.author.id);

        if(usuari){
            let obj = new Objecta(usuari, "cosa",2,"Cap");
            await coinBot.tenda.nouProducta(obj, usuari, parseInt(cont[0]));
            msg.channel.send("S'ha creat el nou producta");
        }
    }

    await coinBot.guardarTot();
});

coinBot.afegirEvent("message", "aconseguir", async (cont, msg)=>{
    await coinBot.cargarTot();

    if(cont[0]){
        let usuari = await coinBot.usuaris.getAsync(msg.author.id);
        if(usuari){
            let objecta = new Objecta(usuari, cont[0], parseInt(cont[1]), cont[2]);
            await usuari.inventori.setAsync(objecta.nom, objecta);

            msg.channel.send("S'ha afegit correctament");
        }
    }

    await coinBot.guardarTot();
})

coinBot.afegirEvent("message", "gastar", async (cont, msg)=>{
    await coinBot.cargarTot();
    let usuari = await coinBot.usuaris.getAsync(msg.author.id);

    if(usuari){
        if(cont[0] && cont[1]){
            let obj = usuari.inventori.get(cont[0]);
            if(obj){
                obj.gastar(parseInt(cont[1]));
            }else{
                msg.channel.send(`No tens ${cont[0]}`);
            }
        }else{
            msg.channel.send(`No has ficat prouta informació`);
        }
    }

    await coinBot.guardarTot();
})


coinBot.afegirEvent("message", "començar", async (cont, msg)=>{
    await coinBot.cargarTot();
    let llista = [];

    for(let id of cont){
        let r = Math.random();
        let usuari = await coinBot.usuaris.getById(id);

        if(usuari){
            if(r < 0.5){
                llista.push(usuari);
            }else{
                llista.unshift(usuari);
            }
        }else{
            console.log(`ERROR: Usuari ${id} no trobat`);
            msg.channel.send(`ERROR: Usuari ${id} no trobat`);
            break;
        }
    }

    let ww = new WareWolf(llista);

    console.table();

    coinBot.warewolf = ww;
})


coinBot.afegirEvent("message", "j", (cont, msg)=>{
    // Proces partida jugadors
})