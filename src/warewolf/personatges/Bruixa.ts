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

        this.puntsForts = "``Pot reviure a una persona o prendre la vida d'una altre si sospita que és el llop.``";
        this.puntsFebles = "``Només té dos pocions durant tota la partida i quan se li gasten passa a ser part del poble``";
        this.urlImatge = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FRihvg4GvKqU%2Fmaxresdefault.jpg&f=1&nofb=1";
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

                        return false;
                    }else if(cont[0] == "r" || cont[0] == "reviure"){
                        triat.potMorir = false;
                        this.curar = false;

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