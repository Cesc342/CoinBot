const Discord = require("discord.js");
const client = new Discord.Client();



const fs = require("fs");

const Comando = require("./bot/comandos");
const dataBase = require("./database/database");

const txtCridat = "bot!";


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {
    const bot = new Comando(txtCridat, msg.content);
    console.log(`${msg.author}:  ${msg.content}`);

    if(bot.activar(msg.content))
    {
        missatge = bot.agafarComando(msg.content);
        console.log(missatge);
        console.table(bot.comando);

        if(missatge == "no") {
            msg.reply("si");
            if(!(bot.comando[0] == "")){
                msg.reply(bot.comando[0]);
            }
        }

        if(missatge == "agafar"){
            await dataBase.agafar(msg.author);
            console.table(dataBase.json);
            try{
                msg.reply("Diners: " + dataBase.json[msg.author].diners + "$");
            }catch(erro){
                msg.reply("No tens cap conta creada: " + erro);
                console.table(dataBase.json);
            }
        }

        if(missatge == "donar"){
            diners = bot.comando[1];
            id = bot.comando[0];
            await dataBase.agafar();
            try{
                await dataBase.donar(id, parseInt(diners));
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

const token = agafarToken().then((res)=>{
    console.table(res)
    client.login(res.token);
});

//Lol