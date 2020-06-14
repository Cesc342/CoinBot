import { Llistes } from "../../../database/Llistes"
import { Usuari } from "../../../usuaris/Usuari";
import { BaseDades } from "../../../database/BaseDades";

export type eventAfecta = (usuari: Usuari)=>void;

export class AfectesListener extends Llistes<string, eventAfecta>{
    public moldeFuncions: Llistes<string,any> = new Llistes();
    
    constructor(){
        super();
        this.set("PUJAR_IMPOSTOS", (usuari)=>{
            console.log("---- Hola ----");
        })

        this.set("BAIXAR_IMPOSTOS", ()=>{
            console.log("---- Adeu ----");
        })

        this.set("MES_POSSIBILITATS_ROBAR", ()=>{
            console.log(" ---- Si ----");
        })

        this.set("MENYS_POSSIBILITATS_ROBAR", ()=>{
            console.log(" ---- No -----");
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