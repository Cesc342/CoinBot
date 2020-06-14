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
            let venedor = await this.usuaris.getAsync(prodJson.venedor);

            if(venedor){
                let data: DadesProducta = {
                    cost: prodJson.cost,
                    venedor: venedor,
                    nom: prodJson.nom,
                    detalls: prodJson.detalls,
                    num: parseInt(prodJson.num)
                }

                let producta = new Producta(venedor ,data.nom);
                await producta.processarDades(data);
                this.setAsync(id, producta);
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
        let producta = new Producta(venedor, objecta.nom, objecta.num, objecta.detalls);

        await producta.completarInfo(venedor, cost);

        this.set(producta.nom, producta);
        await this.guardar();
    }

    public async outTenda(): Promise<string>
    {
        let txt = "---------------------- TENDA ---------------------- \n";
        this.forEachAsync((producta)=>{
            txt += `Nom: ${producta.nom}  Cost: ${producta.cost}  Venedor: ${producta.venedor.username} \n`;
        })
        txt += "------------------------------------------------------";

        return txt;
    }
}