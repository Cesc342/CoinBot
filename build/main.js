"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client();
/*

import fs = require("fs");
import {Comandos} from "./bot/comandos";
import {dataBase} from "./database/DataBase";

const txtCridat = "bot!";


client.on('ready', () => {
    console.log(`Logged in as ${client.user}!`);
});

client.on('message', async (msg) => {
    const bot = new Comandos(txtCridat, msg.content);
    console.log(`${msg.author}:  ${msg.content}`);

    if(bot.activar())
    {
        const missatge: string = bot.agafarComando();
        console.log(missatge);
        console.table(bot.comando);

        if(missatge == "no") {
            msg.reply("si");
            if(!(bot.comando[0] == "")){
                msg.reply(bot.comando[0]);
            }
        }

        if(missatge == "agafar"){
            await dataBase.agafar(msg.author.tag);
            console.table(dataBase.json);
            try{
                msg.reply("Diners: " + dataBase.json[msg.author.tag].diners + "$");
            }catch(erro){
                msg.reply("No tens cap conta creada: " + erro);
                console.table(dataBase.json);
            }
        }

        if(missatge == "donar"){
            const diners = bot.comando[1];
            const id = bot.comando[0];
            await dataBase.agafar(id);
            try{
                await dataBase.donar(id, parseInt(diners), msg.author.tag);
                msg.reply("Fet");
            }catch(error){
                msg.reply("No has ficat bé el comando. Segurament et falta una id o els diners");
            }
        }
    }
});

async function agafarToken(){
    const data = await fs.readFileSync("../CoinBot.json");
    console.log(data);
    const dataJson = data.toString();
    console.log(dataJson);
    const token = JSON.parse( dataJson );
    console.table(token)
    return token;
}

agafarToken().then((res)=>{
    console.table(res)
    client.login(res.token);
});
*/
//Lol
