import { Personatge, RolEvent } from "./Personatge";
import { Usuari } from "../../usuaris/Usuari";
import { WareWolf } from "../WareWolf";

export class Cupido extends Personatge{
    public rol: string = "cupido";
    public jaTriat: boolean = false;

    constructor(usuari: Usuari, warewolf: WareWolf)
    {
        super(usuari, "Cupido", warewolf);
        this.accio();
        this.puntsForts = "``Pot enamorar a dos usuaris fent que el que li passi a un li passa també a l'altre.``";
        this.puntsFebles = "``Només ho pot fer un cop per partida i després es converteix en un usuari del poble.``";
        this.urlImatge = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F47%2Fc4%2F7a%2F47c47af85bd55a5b31e1cec06fa33f5d.jpg&f=1&nofb=1";
    }


    public async accio(): Promise<void>
    {
        let event: RolEvent = async (cont, msg) => {
            if(this.jaTriat){
                if(cont[0] && cont[1] && !this.mort){
                    this.jaTriat = false;

                    let enamorat_1 = await this.warewolf.getById(cont[0]);
                    let enamorat_2 = await this.warewolf.getById(cont[1]);

                    if(enamorat_1 && enamorat_2){
                        enamorat_1.enamorat = enamorat_2;
                        enamorat_2.enamorat = enamorat_1;

                        return false;
                    }
                }
            }
            return true;
        }

        this.ficarEvent(event);
    }
}