import { BaseDades } from "../database/BaseDades";
import { Usuari, DadesUsuari } from "./Usuari";
import { DadesInventari } from "./objectes/Inventori";


export class Usuaris{
    public llista: any | Usuari;
    private dataUsuaris: BaseDades = new BaseDades("data");
    private dataInventoris: BaseDades = new BaseDades("inventoris");


    public async agafar(): Promise<void>
    {
        await this.dataUsuaris.agafar();
        await this.dataInventoris.agafar();

        const dataUsu: any = this.dataUsuaris.json;
        const dataInv: any = this.dataInventoris.json;

        let llista: any = {}

        for(let id in dataUsu){
            let usuari = new Usuari( dataUsu[id], dataInv[id]);
            llista[usuari.tag] = usuari;
        }
        this.llista = llista;
    }


    public async guardar(): Promise<void>
    {
        let jsonUsu = this.dataUsuaris.json;
        let jsonInv = this.dataInventoris.json;

        for(let id in this.llista){
            let usuari: Usuari = this.llista[id];
            jsonUsu[id] = await usuari.agafarDadesUsuari();
            jsonInv[id] = await usuari.inventori.agafarInventori();
        }

        this.dataUsuaris.json = jsonUsu;
        this.dataInventoris.json = jsonInv;

        await this.dataUsuaris.guardar();
        await this.dataInventoris.guardar();
    }


    public async nouUsuari(tag: string): Promise<void>
    {
        const dadUsu: DadesUsuari = {
            tag: tag,
            diners: 10,
            banc: 0
        }
        const dadInv: DadesInventari = {
            tag: tag,
            objectes: {}
        }

        let usuari = new Usuari(dadUsu, dadInv);
        this.llista[usuari.tag] = usuari;
        await this.guardar();
    }
}