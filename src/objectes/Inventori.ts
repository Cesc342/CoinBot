import { Objecta, DataObjecta } from "./Objecta";

export interface DadesInventari {
    id: string,
    objectes: any
}

export class Inventori {
    public objectes: any;
    public id: string;

    constructor({id, objectes}: DadesInventari)
    {
        this.id = id;
        this.objectes = objectes;
    }

    public agafarInventori(): DadesInventari
    {
        let dadesObjectes: any = {};
        for(let nom of this.objectes){
            dadesObjectes[nom] = this.objectes[nom].agafarDades();
        }

        let data: DadesInventari = {
            id: this.id,
            objectes: dadesObjectes
        }

        return data;
    }
}