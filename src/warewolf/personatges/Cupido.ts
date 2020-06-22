import { Personatge, RolEvent } from "./Personatge";
import { Usuari } from "../../usuaris/Usuari";
import { WareWolf, tipusPersonatges } from "../WareWolf";
import { Llob } from "./Llob";

export class Cupido extends Personatge{
    public rol: string = "cupido";
    public noHaTriat: boolean = false;

    constructor(usuari: Usuari, warewolf: WareWolf, seguent: Llob)
    {
        super(usuari, "Cupido", warewolf);
        this.accio();
        this.seguent = seguent;
    }


    public async accio(): Promise<void>
    {
        let event: RolEvent = async (cont, msg) => {
            if(this.noHaTriat){
                if(cont[0] && cont[1] && !this.mort){
                    this.noHaTriat = false;

                    let enamorat_1 = await this.warewolf.getById(cont[0]);
                    let enamorat_2 = await this.warewolf.getById(cont[1]);

                    if(enamorat_1 && enamorat_2){
                        enamorat_1.enamorat = enamorat_2;
                        enamorat_2.enamorat = enamorat_1;

                        return false;
                    }
                }
            }else{
                this.next();
            }
            return true;
        }

        this.ficarEvent(event);
    }
}