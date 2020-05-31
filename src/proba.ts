import { BaseDades } from "./database/BaseDades";

import { Usuari } from "./usuaris/Usuari";
import { Usuaris } from "./usuaris/Usuaris";

import { Objecta } from "./objectes/Objecta";
import { Inventori } from "./objectes/Inventori";


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
    await users.guardar();

    console.table(users.llista.get("<@!409313183027953664>"));
}


function proba1<T>(hola: T): T
{
    return hola;
}


function probaObj(): void
{
    let obj: Objecta = new Objecta("Algo",100,"No fa res i punto.");

    console.log(obj.gastar(50));
    console.log(obj.agafarDades());

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

    console.table(inventori.objectes)

    let algo: any = inventori.objectes;
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

    let usuari: Usuari = new Usuari(dataUsu, dataInv);

    let obj: Objecta = usuari.inventori.objectes.Nose;

    console.table(obj.nom);
}

async function probaUsus()
{
    let usuaris: Usuaris = new Usuaris();
    await usuaris.agafar();

    console.table(usuaris.llista.get("<@!409313183027953664>"))
}

probaUsus();