import { Objecta, DataObjecta } from "../economia/objectes/Objecta";
import { Llistes } from "../database/Llistes";
import { Usuari } from "./Usuari";
import { AfectesListener, eventAfecta } from "../economia/objectes/afectes/AfectesListener";

export type DadesInventari = {
    id: string,
    objectes: any;
}

export class Inventori extends Llistes<string, Objecta> {
    public id: string;
    public usuari: Usuari;
    public afectesListener: AfectesListener = new AfectesListener();

    constructor({id, objectes}: DadesInventari, usuari: Usuari)
    {
        super();
        this.id = id;
        this.afectesListener.cargar().then(()=>{
            for(let idObj in objectes){
                let dataObj = objectes[idObj];
                let obj = new Objecta(usuari, dataObj.nom, dataObj.num, dataObj.detalls);
                this.cargarAfectesObj(obj).then(()=>{
                    this.set(obj.nom, obj);
                })
            }
        })

        this.usuari = usuari;
    }

    private async cargarAfectesObj(objecta: Objecta)
    {
        let afectes = await this.afectesListener.agafarAfectes(objecta.nom);

        if(afectes){
            objecta.afectes = afectes;
        }
    }

    public async agafarInventori(): Promise<DadesInventari>
    {
        let dadesObjectes: any = {};
        await this.forEachAsync(async (obj, nom)=>{
            console.table();
            dadesObjectes[nom] = await obj.agafarDades();
        })

        let data: DadesInventari = {
            id: this.id,
            objectes: dadesObjectes
        }

        return data;
    }
}