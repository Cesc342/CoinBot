import { Objecta, DataObjecta } from "./Objecta";

interface DataInventari {
    id: string,
    objectes: any
}

export class Inventori {
    public objectes: Map<string, Objecta> = new Map();
    public id: string;

    constructor({id, objectes}: DataInventari)
    {
        this.id = id;

        for(let id in objectes){ //Potser Funciona??? Nose ho he fet a lo rapid
            this.objectes.set(id, objectes[id]);
        }
    }

    public agafarInventori(): DataInventari
    {
        let dadesObjectes: any = {};
        this.objectes.forEach((objecta, nom)=>{
            let dadesObjecta: DataObjecta = objecta.agafarDades();
            dadesObjectes[nom] = objecta;
        })

        let data: DataInventari = {
            id: this.id,
            objectes: dadesObjectes
        }

        return data;
    }
}