import { Personatge, RolEvent } from "./Personatge";
import { Usuari } from "../../usuaris/Usuari";
import { WareWolf } from "../WareWolf";
import { MessageEmbed, User } from "discord.js";

export class Bruixa extends Personatge{
    public rol: string = "bruixa";
    public torn: boolean = false;

    public curar: boolean = true;
    public matar: boolean = true;

    constructor(usuari: Usuari, warewolf: WareWolf)
    {
        super(usuari, "bruixa", warewolf);
        this.cargarAccio();
    }

    public cargarAccio(): void
    {
        let event: RolEvent = async (cont, msg)=>
        {
            if(!this.mort && cont[0] && cont[1]){
                let triat = await this.warewolf.getById(cont[1]);

                if(triat){
                    if(cont[0] == "m" || cont[0] == "matar"){
                        triat.potMorir = true;
                        this.matar = false;
                        console.log("BRUIXA MORT");
                        console.log(triat.usuari.username);

                        return false;
                    }else if(cont[0] == "r" || cont[0] == "reviure"){
                        triat.potMorir = false;
                        this.curar = false;
                        console.log("BRUIXA CURAT");
                        console.log(triat.usuari.username);

                        return false;
                    }
                }
                return true;
            }
            return true;
        }

        this.ficarEvent(event);
    }
}