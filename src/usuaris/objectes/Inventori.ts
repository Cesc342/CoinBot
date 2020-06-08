import { Objecta, DataObjecta } from "./Objecta";

export type DadesInventari = {
    id: string,
    objectes: any;
}

export class Inventori implements DadesInventari{
    public objectes: any;
    public id: string;


    constructor({id, objectes}: DadesInventari)
    {
        this.id = id;
        let objectesDespres: any = {};
        for(let idObj in objectes){
            objectesDespres[idObj] = objectes[idObj];
        }
        this.objectes = objectesDespres;
    }

    public async agafarInventori(): Promise<DadesInventari>
    {
        let dadesObjectes: any = {};
        for(let nom in this.objectes){
            let obj: Objecta = this.objectes[nom];
            console.table(obj);
            dadesObjectes[nom] = obj;
        }

        let data: DadesInventari = {
            id: this.id,
            objectes: dadesObjectes
        }

        return data;
    }
}