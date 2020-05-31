import { BaseDades } from "../database/BaseDades";
import { Usuari, DadesUsuari } from "./Usuari";

export class Usuaris{
    public llista: Map<string,Usuari> = new Map();
    private dataUsuaris: BaseDades = new BaseDades("data");
    private dataInventoris: BaseDades = new BaseDades("inventoris");


    public async agafar(): Promise<void>
    {
        await this.dataUsuaris.agafar();
        await this.dataInventoris.agafar();

        const dataUsu: any = this.dataUsuaris.json;
        const dataInv: any = this.dataInventoris.json;

        for(let id in dataUsu){
            let usuari = new Usuari( dataUsu[id], dataInv[id]);
            this.llista.set(usuari.id, usuari);
        }
    }


    public async guardar(): Promise<void>
    {
        let jsonUsu = this.dataUsuaris.json;
        let jsonInv = this.dataInventoris.json;

        this.llista.forEach((usuari, id)=>{
            jsonUsu[id] = usuari.agafarDadesUsuari();
            jsonInv[id] = usuari.inventori.agafarInventori();
        });

        this.dataUsuaris.json = jsonUsu;
        this.dataInventoris.json = jsonInv;

        await this.dataUsuaris.guardar();
        await this.dataInventoris.guardar();
    }


    public async nouUsuari(usuari: Usuari): Promise<void>
    {
        this.llista.set(usuari.id, usuari);
        await this.guardar();
    }
}