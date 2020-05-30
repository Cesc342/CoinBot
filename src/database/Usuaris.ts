import { BaseDades } from "./BaseDades";
import { Usuari, DadesUsuari } from "./Usuari";
import { fstat } from "fs";

export class Usuaris{
    public llista: Map<string,Usuari> = new Map();
    private baseDades: BaseDades = new BaseDades("data");

    public async cargarTot(): Promise<void>
    {
        await this.baseDades.agafar();
        const data: any = this.baseDades.data.json;

        for(let dataUsuari in data){
            let usuari = new Usuari( data[dataUsuari] );
            this.llista.set(usuari.id, usuari);
        }
    }


    public async guardarUsuaris()
    {
        let json = this.baseDades.data.json;

        this.llista.forEach((usuari, id)=>{
            json[id] = usuari.agafarDadesUsuari();
        });

        this.baseDades.data.json = json;
        await this.baseDades.guardar();
    }
}