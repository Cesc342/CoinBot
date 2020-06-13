import { BaseDades } from "./database/BaseDades";

import { Usuari } from "./usuaris/Usuari";
import { Usuaris } from "./usuaris/Usuaris";

import { Objecta } from "./economia/objectes/Objecta";
import { Inventori } from "./usuaris/Inventori";

import { Separador } from "./bot/compilador/Separador";
import { Command } from "./bot/esdeveniments/Command";
import { Message, Client, User } from "discord.js";
import { Tenda } from "./economia/Tenda";
import { Producta } from "./economia/objectes/Producta";
import { Llistes } from "./database/Llistes";



async function probaBD()
{
    const d = new BaseDades("proba");
    await d.agafar();

    d.json.hola = "si";

    await d.guardar();
}


async function probaUis()
{
    let users = new Usuaris();
    await users.agafar();

    let usuari: Usuari | undefined = users.get("409313183027953664");
    if(usuari){
        usuari.sumarDiners(10)
        console.table(await usuari.agafarDadesUsuari());
        await users.guardar();
    }
}


function proba1<T>(hola: T): T
{
    return hola;
}


function probaObj(): void
{
    let obj: Objecta = new Objecta("Algo",100,"No fa res i punto.");

    console.log(obj.gastar(50));
    console.log(obj);

    console.table(obj);
}

function probaInv(): void
{
    let obj1: Objecta = new Objecta("Nose",100,"No ho se. Tu sabras.");
    let obj2: Objecta = new Objecta("Nose Algo",10,"Nose, potser aquest fa algo. Tiu, no ho se tot.");

    let inventori: Inventori = new Inventori({
        id:"Jugador2",
        objectes: {
            "Nose": obj1,
            "Nose Algo": obj2
        }
    })

    console.table(inventori);

    let algo: any = inventori;
    console.log(`Objecta:
    Nom: ${algo.nom},
    Numero en el inventori: ${algo.num},
    Detalls: ${algo.detalls}`);

    console.log();
    console.log(JSON.stringify( inventori.agafarInventori() ));
}

async function probaUsu()
{
    let obj1: Objecta = new Objecta("Nose",100,"No ho se. Tu sabras.");
    let obj2: Objecta = new Objecta("Nose Algo",10,"Nose, potser aquest fa algo. Tiu, no ho se tot.");

    let dataUsu = {
        id:"cesc",
        diners: 20,
        banc: 30
    };
    let dataInv = {
        id:"cesc",
        objectes:{
            Nose:obj1,
            "Nose Algo":obj2
        }
    }

    let usuari: Usuari = new Usuari(new User(new Client(), {}), dataUsu, dataInv);

    let obj: Objecta | undefined = usuari.inventori.get("Nose");

    if(obj){
        console.table(obj.nom);
    }
}

async function probaUsus()
{
    let usuaris: Usuaris = new Usuaris();
    await usuaris.agafar();

    console.table(usuaris);
}

async function sandbox1()
{
    let obj1: Objecta = new Objecta("AAAA",100,"CRIDA!!! AAAAAAA!!!!!");
    let obj2: Objecta = new Objecta("MES ALT",10,"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!!!!!!!!!!");

    const usuaris: Usuaris = new Usuaris();
    await usuaris.agafar();

    let dataUsu = {
        id:"cesc",
        diners: 20,
        banc: 30
    };
    let dataInv = {
        id:"cesc",
        objectes:{
            "AAAA":obj1,
            "MES ALT":obj2
        }
    }
    let nouUsuari: Usuari = new Usuari(new User(new Client, {}), dataUsu, dataInv);

    console.table(nouUsuari);

    await usuaris.nouUsuari("TAG", new User(new Client(), {}));

    let usuari: Usuari | undefined = usuaris.get("cesc");

    if(usuari){
        console.table(usuari.inventori.get("AAAA"));
    }else{
        console.log("undefined");
    }
}


async function probaSep()
{
    let separador: Separador = new Separador("bot!");
    await separador.separarMissatge("bot!a tot no le");

    console.table(separador);
}

async function probaCom()
{
    let command: Command = new Command("a", async (contingut, msg)=>{
        console.log(contingut[0]);
        console.log(msg);
    });

    // command.on(["hola"],"aa");   // No es pot probar almenys que canviis unes coses del arxiu
                                    // Això es perque on fica "aa" tindria de haver una variable de type :Message de discord
}

async function probaUsus_2()
{
    let usuaris: Usuaris = new Usuaris();
    await usuaris.agafar();

    let usuari = usuaris.get("Cesc");

    if(usuari){
        usuari.sumarDiners(20);
    }

    await usuaris.guardar();
}

async function probaTend()
{
    let usuaris: Usuaris = new Usuaris();
    await usuaris.agafar();
    let tenda: Tenda = new Tenda(usuaris);
    await tenda.agafar();

    let usuari = usuaris.get("Cesc");

    let obj: Objecta = new Objecta("A", 2, "ningun");

    if(usuari){
        await tenda.nouProducta(obj, usuari, 10);
        await tenda.guardar();
    }
}

async function probaTend_2(){
    let usuaris: Usuaris = new Usuaris();
    await usuaris.agafar();
    let tenda: Tenda = new Tenda(usuaris);
    await tenda.agafar();

    let usuari = usuaris.get("Cesc");
    console.table(usuari);

    let producta = tenda.get("A");

    if(producta && usuari){
        if(producta.comprar(usuari, 1)){
            console.log("Comprat");
        }
        console.table(producta);
        tenda.set(producta.nom, producta);
        await tenda.guardar();
    }
}

async function probaLlist() {
    let llistes = new Llistes<string, number>();
    let i = 1;

    console.log(i);
    i++;
    await llistes.setAsync("hola", 126);
    console.log(i);
    i++;
    await llistes.setAsync("hey", 425);
    console.log(i);
    i++;
    await llistes.setAsync("adeu", 999);
    console.log(i);
    i++;
    await llistes.setAsync("ALV", 777);

    console.log(i);
    i++;

    let n = await llistes.getAsync("hola");
    console.log(i);
    i++;
    let a = await llistes.getAsync("hey");
    console.log(i);
    i++;
    let b = await llistes.getAsync("hey");
    console.log(i);
    i++;
    let c = await llistes.getAsync("hey");
    console.log(i);
    i++;

    if(n && a && b && c){
        console.log(n);
        console.log(a);
        console.log(b);
        console.log(c);
    }

    console.log("........... FOR EACH .............");
    await llistes.forEachAsync((n, k)=>{
        console.log(`${k} -> ${n}`);
    });
    console.log("ACABAT");
}


sandbox1();