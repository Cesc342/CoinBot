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
        this.puntsForts = "``Tria qui viu i qui mor durant el joc. Es desperta abans que la resta de jugadors.``";
        this.puntsFebles = "``Tothom vota per a eliminar a un usuari que creuen que és el llop, osigui que haureu d'anar amb cura de ser silenciosos``";
        this.urlImatge = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.oSem4zM0NqC9nTIJezJAeAHaF_%26pid%3DApi&f=1";

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