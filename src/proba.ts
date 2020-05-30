import { BaseDades } from "./database/BaseDades";
import { Usuari } from "./usuaris/Usuari";
import { Usuaris } from "./usuaris/Usuaris";

async function probaBD()
{
    const d = new BaseDades("proba");
    await d.agafar();

    d.json.hola = "si";

    await d.guardar();
}


function probaUi()
{
    const u:Usuari = new Usuari({
        id:"Cesc",
        diners:50,
        banc:10
    })

    u.sumarDiners(15);
    console.log(u.treuraBanc(-5));

    console.table(u);
}


async function probaUis()
{
    let users = new Usuaris();
    await users.cargarLlista();
    await users.guardarUsuaris();

    console.table(users.llista.get("<@!409313183027953664>"));
}


function proba1<T>(hola: T): T
{
    return hola;
}

console.log(proba1<number>(9));
