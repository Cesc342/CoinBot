import { Usuari } from "../../usuaris/Usuari";
import { BaseDades } from "../../database/BaseDades";
import { eventAfecta } from "./afectes/AfectesListener";
import { Afecta } from "./afectes/Afecta";

export type DataObjecta = {
    nom: string,
    num: number,
    detalls: string,
}

export class Objecta implements DataObjecta{
    public nom: string;
    public num: number = 1;
    public detalls: string = "No te descrupció";
    public usuari: Usuari;

    public afectes: eventAfecta[] | undefined = undefined;

    constructor(usuari: Usuari, nom: string, num?: number, detalls?: string)
    {
        this.usuari = usuari;
        this.nom = nom;
        if(num){
            this.num = num;
        }
        if(detalls){
            this.detalls = detalls;
        }
    }


    public gastar(num: number, altreUsuari?: Usuari): boolean
    {
        if(this.hiHaSuficients(num)){
            this.num -= num;
            while(num > 0){
                this.afecta(new Afecta(this, this.usuari, altreUsuari));
                num--;
            }
            return true;
        }

        return false;
    }

    private hiHaSuficients(num: number): boolean
    {
        return this.num >= num;
    }


    public obtenir(num: number): void
    {
        this.num += num;
    }

    public async agafarDades(): Promise<DataObjecta>
    {
        let data: DataObjecta = {
            nom: this.nom,
            num: this.num,
            detalls: this.detalls
        }

        return data;
    }

    //------------------------------------------------------ AFECTES ------------------------------------------------------
    public afecta(afecta: Afecta)
    {
        if(this.afectes){
            this.afectes.forEach((afectaFuncio) => afectaFuncio(afecta));
        }
    }
}