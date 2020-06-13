import { Objecta, DataObjecta } from "../economia/objectes/Objecta";
import { Llistes } from "../database/Llistes";

export type DadesInventari = {
    id: string,
    objectes: any;
}

export class Inventori extends Llistes<string, Objecta> {
    public id: string;

    constructor({id, objectes}: DadesInventari)
    {
        super();
        this.id = id;
        for(let idObj in objectes){
            let dataObj = objectes[idObj];

            let obj = new Objecta(dataObj.nom, dataObj.num, dataObj.detalls);
            this.set(obj.nom, obj);
        }
    }

    public async agafarInventori(): Promise<DadesInventari>
    {
        let dadesObjectes: any = {};
        await this.forEachAsync(async (obj, nom)=>{
            dadesObjectes[nom] = await obj.agafarDades();
        })

        let data: DadesInventari = {
            id: this.id,
            objectes: dadesObjectes
        }

        return data;
    }
}