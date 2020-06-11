import { Objecta } from "./Objecta";
import { Usuari } from "../../usuaris/Usuari";
import { User, Client } from "discord.js";

export interface DadesProducta {
    cost: number,
    venedor: Usuari,
    nom: string,
    detalls: string,
    num: number
}

type DadesProductaJson = {
    cost: number,
    venedor: string,
    nom: string,
    detalls: string,
    num: number
}

export class Producta extends Objecta implements DadesProducta
{
    public cost: number = 0;
    public venedor: Usuari = new Usuari(new User(new Client(), {}), {id: "", diners: 0, banc: 0}, {id: "", objectes: {}});


    public async processarDades({nom, detalls, num, cost, venedor}: DadesProducta): Promise<void>
    {
        this.nom = nom;
        this.detalls = detalls;
        this.num = num;
        this.cost = cost;
        this.venedor = venedor;
    }

    public async completarInfo(venedor: Usuari, cost: number): Promise<void>
    {
        this.cost = cost;
        this.venedor = venedor;
    }

    public comprar(comprador: Usuari, num: number): boolean
    {
        if(this.gastar(num)){
            if(comprador.restarDiners(this.cost * num)) {
                this.venedor.sumarDiners(this.cost * num);
                return true;
            }
        }
        return false;
    }


    public agafarDades(): Promise<DadesProductaJson>
    {
        let dades: DadesProductaJson = {
            cost: this.cost,
            venedor: this.venedor.id,
            nom: this.nom,
            detalls: this.detalls,
            num: this.num
        };

        return Promise.resolve(dades);
    }
}