import { Llistes } from "../../../database/Llistes"
import { Usuari } from "../../../usuaris/Usuari";
import { BaseDades } from "../../../database/BaseDades";
import { Afecta } from "./Afecta";

export type eventAfecta = (afecta: Afecta)=>void;

export class AfectesListener extends Llistes<string, eventAfecta>{
    public moldeFuncions: Llistes<string,any> = new Llistes();

    constructor(){
        super();
        this.set("PUJAR_IMPOSTOS", ({afector})=>{
            afector.impostos = afector.impostos * 2;
        })

        this.set("BAIXAR_IMPOSTOS", ({afector})=>{
            afector.impostos = afector.impostos / 2;
        })

        this.set("MES_POSSIBILITATS_ROBAR", ({afector})=>{
            afector.posRobar += 0.05
        })

        this.set("MENYS_POSSIBILITATS_ROBAR", ({afector})=>{
            afector.posRobar -= 0.05;
        })

        this.set("TORNAR_UTILITZAR", ({objecta}) => {
            objecta.num++;
        })
    }


    public async cargar()
    {
        let dataAfectes: BaseDades = new BaseDades("objectes");
        await dataAfectes.agafar();

        for(let obj in dataAfectes.json){
            this.moldeFuncions.set(obj, dataAfectes.json[obj]);
        }
    }


    public async agafarAfectes(nom: string): Promise<eventAfecta[] | undefined>
    {

        let llistaAfectes = await this.moldeFuncions.getAsync(nom);
        let llista: eventAfecta[] = [];

        if(llistaAfectes){
            for(let nomAfecta in llistaAfectes){
                let activar: boolean = llistaAfectes[nomAfecta];

                if(activar){
                    let afecta = await this.getAsync(nomAfecta);
                    if(afecta){
                        llista.push(afecta);
                    }
                }
            }
        }

        if(llista.length > 0){
            return llista;
        }else{
            return undefined;
        }
    }
}