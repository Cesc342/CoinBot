import { BaseDades } from "./BaseDades";
import { Usuari } from "./Usuari";

async function probaBD(){
    const d = new BaseDades("proba");
    await d.agafar();

    d.data.json.hola = "si";

    await d.guardar();
}

function probaUi(){
    const u:Usuari = new Usuari({
        id:"Cesc",
        diners:50,
        banc:10
    })

    u.sumarDiners(10);
    console.log(u.treuraBanc(5));

    console.table(u);
}

probaUi();