import { Usuari } from "../usuaris/Usuari";

interface DadesProducta{
    cost: number,
    venedor: Usuari,
    nom: string,
    detalls: string,
    num: number
}

export class Producta implements DadesProducta{
    cost: number;
    venedor: Usuari;
    nom: string;
    detalls: string = "";
    num: number = 1;


    constructor(venedor: Usuari, nom: string, cost: number, numero?: number ,detalls?: string)
    {
        this.venedor = venedor;
        this.nom = nom;
        this.cost = cost;
        if(numero){
            this.num = numero;
        }
        if(detalls){
            this.detalls = detalls;
        }
    }


    public vendra(comprador: Usuari): void
    {
        comprador.restarDiners(this.cost);
        this.venedor.sumarDiners(this.cost);
    }
}
