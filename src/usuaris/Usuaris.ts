import { BaseDades } from "../database/BaseDades";
import { Usuari, DadesUsuari } from "./Usuari";
import { DadesInventari } from "./objectes/Inventori";
import { Compilador } from "../bot/compilador/Compilador";
import { Client, User } from "discord.js";


export class Usuaris extends Map<string, Usuari>{
    private dataUsuaris: BaseDades = new BaseDades("data");
    private dataInventoris: BaseDades = new BaseDades("inventoris");
    private compilador = new Compilador();

    public async agafar(bot?: Client): Promise<void>
    {
        await this.dataUsuaris.agafar();
        await this.dataInventoris.agafar();

        const dataUsu: any = this.dataUsuaris.json;
        const dataInv: any = this.dataInventoris.json;

        if(bot){
            for(let id in dataUsu){
                let usuariDiscord = await bot.users.fetch(id);
                let usuari = new Usuari(usuariDiscord, dataUsu[id], dataInv[id]);
                this.set(usuari.id, usuari);
            }
        }else{
            for(let id in dataUsu){
                let usuari = this.get(id);
                if(usuari){
                    usuari.implentarDades(dataUsu[id], dataInv[id]);
                    this.set(usuari.id, usuari);
                }else{
                    console.error(`ERROR: no s'ha trobat l'usuari ${id}`);
                }
            }
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


    public async nouUsuari(id: string, usuariDiscord: User): Promise<Usuari>
    {
        let idPros: string = await this.compilador.treuraId(id);
        const dadUsu: DadesUsuari = {
            id: idPros,
            diners: 10,
            banc: 0
        }
        const dadInv: DadesInventari = {
            id: idPros,
            objectes: {}
        }

        let usuari = new Usuari(usuariDiscord, dadUsu, dadInv);
        this.set(usuari.id, usuari);
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

    public async getById(idBrut: string): Promise<Usuari | undefined>
    {
        console.log(idBrut);
        let id = await this.compilador.treuraId(idBrut);
        if(id){
            console.log(`idBrut: ${idBrut} >>>>> ${id}`);
        }
        let usuari: Usuari | undefined;
        if(id){
            usuari = this.get(id);
        }else{
            usuari = this.get(idBrut);
        }
        return usuari;
    }
}