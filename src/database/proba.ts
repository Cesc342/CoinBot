import { BaseDades } from "./BaseDades";
import { Usuari } from "./Usuari";
import { Usuaris } from "./Usuaris";

async function probaBD()
{
    const d = new BaseDades("proba");
    await d.agafar();

    d.data.json.hola = "si";

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
    await users.cargarTot();
    await users.guardarUsuaris();
}

probaUis();