import { Objecta, DataObjecta } from "./Objecta";

export type DadesInventari = {
    tag: string,
    objectes: any;
}

export class Inventori implements DadesInventari{
    public objectes: any;
    public tag: string;


    constructor({tag: tag, objectes}: DadesInventari)
    {
        this.tag = tag;
        let objectesDespres: any = {};
        for(let idObj in objectes){
            objectesDespres[idObj] = objectes[idObj];
        }
        this.objectes = objectesDespres;
    }

    public agafarInventori(): DadesInventari
    {
        let dadesObjectes: any = {};
        for(let nom in this.objectes){
            dadesObjectes[nom] = this.objectes[nom].agafarDades();
        }

        let data: DadesInventari = {
            tag: this.tag,
            objectes: dadesObjectes
        }

        return data;
    }
}