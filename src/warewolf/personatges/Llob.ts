import { Personatge, RolEvent } from "./Personatge";
import { Usuari } from "../../usuaris/Usuari";
import { Message, MessageEmbed, User } from "discord.js";
import { WareWolf } from "../WareWolf";
import { Bruixa } from "./Bruixa";

export class Llob extends Personatge{
    public rol: string = "llob";

    constructor(usuari: Usuari, warewolf: WareWolf, seguent: Bruixa)
    {
        super(usuari, "llob", warewolf);
        this.cargarAccio();
        this.seguent = seguent;
    }

    public async cargarAccio(): Promise<void>
    {
        let event: RolEvent = async (cont, msg) => {
            if(!this.mort && cont[0]){
                let usuari = await this.warewolf.getById(cont[0]);

                if(usuari) {
                    usuari.potMorir = true;
                    return false;
                }
            }
            return true;
        }
        this.ficarEvent(event);
    }
}