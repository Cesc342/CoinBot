import { BaseDades } from "../database/BaseDades";
import { Producta, DadesProducta } from "./objectes/Producta";
import { Usuari } from "../usuaris/Usuari";
import { Objecta } from "./objectes/Objecta";
import { Usuaris } from "../usuaris/Usuaris";
import { Llistes } from "../database/Llistes";

export class Tenda extends Llistes<string, Producta>{

    private dataTenda: BaseDades = new BaseDades("tenda");
    public usuaris: Usuaris;

    constructor(usuaris: Usuaris)
    {
        super();
        this.usuaris = usuaris;
    }

    public async agafar(): Promise<void>
    {
        await this.usuaris.agafar();
        await this.dataTenda.agafar();

        const dataTend: any = this.dataTenda.json;

        for(let id in dataTend){
            let prodJson: any = dataTend[id];
            let venedor = this.usuaris.get(prodJson.venedor);

            if(venedor){
                let data: DadesProducta = {
                    cost: prodJson.cost,
                    venedor: venedor,
                    nom: prodJson.nom,
                    detalls: prodJson.detalls,
                    num: parseInt(prodJson.num)
                }

                let producta = new Producta(data.nom);
                await producta.processarDades(data);
                this.set(id, producta);
            }
        }
    }


    public async guardar(): Promise<void>
    {
        let jsonUsu = this.dataTenda.json;

        await this.forEachAsync(async (producta, id)=>{
            jsonUsu[id] = await producta.agafarDades();
        })

        this.dataTenda.json = jsonUsu;

        await this.dataTenda.guardar();
    }


    public async nouProducta(objecta: Objecta, venedor: Usuari, cost: number): Promise<void>
    {
        let producta = new Producta(objecta.nom, objecta.num, objecta.detalls);

        await producta.completarInfo(venedor, cost);

        this.set(producta.nom, producta);
        await this.guardar();
    }


    public async forEachAsync(event: (value: Producta, id: string, map: Map<string, Producta>)=>any): Promise<void>
    {
        this.forEach(event);
    }
}