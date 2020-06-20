import { Usuari } from "../usuaris/Usuari";
import { Llistes } from "../database/Llistes";
import { Pobla } from "./personatges/Pobla";
import { Compilador } from "../bot/compilador/Compilador";
import { Bruixa } from "./personatges/Bruixa";
import { Cupido } from "./personatges/Cupido";
import { Llob } from "./personatges/Llob";

export class WareWolf extends Llistes<string, (Pobla | Bruixa | Cupido)>{
    public compilador: Compilador = new Compilador();


    constructor(llistaUsuaris: Usuari[])
    {
        super();
        this.cargar(llistaUsuaris);
    }


    private async cargar(llistaUsuaris: Usuari[]): Promise<void>
    {
        let poblat: Pobla[] = [];


        let llob_1 = new Llob(llistaUsuaris[0]);
        let llob_2 = new Llob(llistaUsuaris[1]);

        let cupido = new Cupido(llistaUsuaris[2]);

        let bruixa = new Bruixa(llistaUsuaris[3]);

        for(let n = 4; n < llistaUsuaris.length; n++){
            poblat.push(new Pobla(llistaUsuaris[n]));
        }

        this.set(llob_1.usuari.tag, llob_1);
        this.set(llob_2.usuari.tag, llob_2);

        this.set(cupido.usuari.tag, cupido);

        for(let pobla of poblat){
            this.set(pobla.usuari.tag, pobla);
        }


        if(llistaUsuaris.length >= 4){
            console.log("Hi ha suficients");
        }else{
            console.log("NO");
        }
    }


    public async getById(idBrut: string)
    {
        let id: string = await this.compilador.treuraId(idBrut);
        await this.getAsync(id);
    }
}