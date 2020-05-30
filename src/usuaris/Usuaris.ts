import { BaseDades } from "../database/BaseDades";
import { Usuari, DadesUsuari } from "./Usuari";

export class Usuaris{
    public llista: Map<string,Usuari> = new Map();
    private baseDades: BaseDades = new BaseDades("data");


    public async cargarLlista(): Promise<void>
    {
        await this.baseDades.agafar();
        const data: any = this.baseDades.json;

        for(let dataUsuari in data){
            let usuari = new Usuari( data[dataUsuari] );
            this.llista.set(usuari.id, usuari);
        }
    }


    public async guardarUsuaris(): Promise<void>
    {
        let json = this.baseDades.json;

        this.llista.forEach((usuari, id)=>{
            json[id] = usuari.agafarDadesUsuari();
        });

        this.baseDades.json = json;
        await this.baseDades.guardar();
    }


    public async nouUsuari(usuari: Usuari): Promise<void>
    {
        this.llista.set(usuari.id, usuari);
        await this.guardarUsuaris();
    }
}