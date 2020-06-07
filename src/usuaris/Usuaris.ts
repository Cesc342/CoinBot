import { BaseDades } from "../database/BaseDades";
import { Usuari, DadesUsuari } from "./Usuari";
import { DadesInventari } from "./objectes/Inventori";


export class Usuaris extends Map<string, Usuari>{
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
            this.set(usuari.tag, usuari);
        }
    }


    public async guardar(): Promise<void>
    {
        let jsonUsu = this.dataUsuaris.json;
        let jsonInv = this.dataInventoris.json;

        await this.forEachAsync(async (usuari, id)=>{
            jsonUsu[id] = await usuari.agafarDadesUsuari();
            jsonInv[id] = await usuari.inventori.agafarInventori();
        })

        this.dataUsuaris.json = jsonUsu;
        this.dataInventoris.json = jsonInv;

        await this.dataUsuaris.guardar();
        await this.dataInventoris.guardar();
    }


    public async nouUsuari(tag: string): Promise<Usuari>
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
        this.set(usuari.tag, usuari);
        await this.guardar();

        return usuari;
    }

    public async usuariRandom(): Promise<Usuari>
    {
        let r: number = Math.random() * this.size;
        let numUsuari: number = Math.floor(r);
        let usuariRand: Usuari | any;
        let i = 0;

        await this.forEachAsync(async (usuari, id)=>{
            if(i == numUsuari){
                usuariRand = usuari;
            }
            i++;
        })

        return usuariRand;
    }

    public async forEachAsync(event: (value: Usuari, id: string, map: Map<string, Usuari>)=>any): Promise<void>
    {
        this.forEach(event);
    }
}