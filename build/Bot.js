"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Compilador_1 = require("./bot/compilador/Compilador");
const Objecta_1 = require("./economia/objectes/Objecta");
const CoinBot_1 = require("./CoinBot");
const WareWolf_1 = require("./warewolf/WareWolf");
const compilador = new Compilador_1.Compilador();
exports.coinBot = new CoinBot_1.CoinBot("bot!", async () => {
    exports.coinBot.cargarTot(true);
});
exports.coinBot.afegirEvent("message", "veura", async (con, msg) => {
    console.log(msg.author.id);
    let usuari = await exports.coinBot.users.fetch(msg.author.id);
    if (usuari) {
        msg.channel.send(usuari.username);
    }
});
exports.coinBot.afegirEvent("message", "crear", async (con, msg) => {
    await exports.coinBot.usuaris.agafar();
    if (con[0]) {
        let id = await compilador.treuraId(con[0]);
        let usuari = await exports.coinBot.users.fetch(id);
        if (usuari) {
            exports.coinBot.usuaris.nouUsuari(usuari.id, usuari);
            msg.channel.send("CREAT");
        }
        else {
            msg.channel.send(`No s'ha trobat l'usuari ${con[0]}`);
        }
    }
    else {
        let usuari = msg.author;
        exports.coinBot.usuaris.nouUsuari(usuari.id, usuari);
    }
    await exports.coinBot.usuaris.guardar();
    await exports.coinBot.usuaris.agafar(exports.coinBot);
});
exports.coinBot.afegirEvent("message", "stats", async (cont, msg) => {
    await exports.coinBot.usuaris.agafar();
    let usuari = await exports.coinBot.usuaris.getById(msg.author.id);
    if (usuari) {
        let txt = [];
        txt[0] = `> Nom ${usuari.username};
        > Diners: ;
        > - Metàlic: ${usuari.diners}$;
        > - Banc: ${usuari.banc}$;
        > Inventori:`;
        let i = 0;
        usuari.inventori.forEach((obj, nom) => {
            txt[1 + i] = `> \`Nom: ${obj.nom}  Num: ${obj.num}
            > Detalls: ${obj.detalls} \``;
            i++;
        });
        msg.channel.send(txt);
    }
});
exports.coinBot.afegirEvent("message", "mirar", (cont, msg) => {
    if (cont[0]) {
        msg.channel.send(cont[0]);
    }
});
exports.coinBot.afegirEvent("message", "tenda", async (cont, msg) => {
    await exports.coinBot.tenda.agafar();
    console.table(exports.coinBot.tenda);
    let txt = await exports.coinBot.tenda.outTenda();
    msg.channel.send(txt);
});
exports.coinBot.afegirEvent("message", "nou", async (cont, msg) => {
    await exports.coinBot.cargarTot();
    if (cont[0]) {
        let usuari = await exports.coinBot.usuaris.getAsync(msg.author.id);
        if (usuari) {
            let obj = new Objecta_1.Objecta(usuari, "cosa", 2, "Cap");
            await exports.coinBot.tenda.nouProducta(obj, usuari, parseInt(cont[0]));
            msg.channel.send("S'ha creat el nou producta");
        }
    }
    await exports.coinBot.guardarTot();
});
exports.coinBot.afegirEvent("message", "aconseguir", async (cont, msg) => {
    await exports.coinBot.cargarTot();
    if (cont[0]) {
        let usuari = await exports.coinBot.usuaris.getAsync(msg.author.id);
        if (usuari) {
            let objecta = new Objecta_1.Objecta(usuari, cont[0], parseInt(cont[1]), cont[2]);
            await usuari.inventori.setAsync(objecta.nom, objecta);
            msg.channel.send("S'ha afegit correctament");
        }
    }
    await exports.coinBot.guardarTot();
});
exports.coinBot.afegirEvent("message", "gastar", async (cont, msg) => {
    await exports.coinBot.cargarTot();
    let usuari = await exports.coinBot.usuaris.getAsync(msg.author.id);
    if (usuari) {
        if (cont[0] && cont[1]) {
            let obj = usuari.inventori.get(cont[0]);
            if (obj) {
                obj.gastar(parseInt(cont[1]));
            }
            else {
                msg.channel.send(`No tens ${cont[0]}`);
            }
        }
        else {
            msg.channel.send(`No has ficat prouta informació`);
        }
    }
    await exports.coinBot.guardarTot();
});
exports.coinBot.afegirEvent("message", "començar", async (cont, msg) => {
    await exports.coinBot.cargarTot();
    let llista = [];
    for (let idBrut of cont) {
        let r = Math.random();
        let id = await compilador.treuraId(idBrut);
        let usuari = await exports.coinBot.usuaris.getById(id);
        if (usuari) {
            if (r < 0.5) {
                llista.push(usuari);
            }
            else {
                llista.unshift(usuari);
            }
        }
        else {
            console.log(`ERROR: Usuari ${id} no trobat`);
            msg.channel.send(`ERROR: Usuari ${id} no trobat`);
            break;
        }
    }
    let ww = new WareWolf_1.WareWolf(llista, msg.channel);
    console.table();
    exports.coinBot.warewolf = ww;
});
exports.coinBot.afegirEvent("message", "j", async (cont, msg) => {
    if (exports.coinBot.warewolf) {
        let usuari = await exports.coinBot.warewolf.getById(msg.author.id);
        if (usuari) {
            usuari.accio(cont, msg);
        }
    }
});
exports.coinBot.afegirEvent("message", "votar", (cont, msg) => {
    if (exports.coinBot.warewolf) {
        if (cont[0]) {
            exports.coinBot.warewolf.votar(msg.author.id, cont[0]);
        }
        else {
            msg.reply("Fica a qui vols votar");
        }
    }
});
