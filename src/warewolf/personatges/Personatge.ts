import { Usuari } from "../../usuaris/Usuari";
import { MessageEmbed } from "discord.js";

export class Personatge {
    public usuari: Usuari;
    public descripcio: string;
    public votacio: number = 0;
    public potVotar: boolean = false;
    public mort: boolean = false;


    constructor(usuari: Usuari, descripcio: string)
    {
        this.usuari = usuari;
        this.descripcio = descripcio;
    }


    public votar(usuari: Personatge): boolean
    {
        if(this.potVotar && !this.mort){
            usuari.votacio++;
            this.potVotar = false;
            return true;
        }
        return false;
    }

    public help(): MessageEmbed
    {
        let msg: MessageEmbed = this.missatge(this.descripcio);
        return msg;
    }

    private missatge(txt: string): MessageEmbed
    {
        let msg: MessageEmbed = new MessageEmbed();
        msg.addField("Descripcio", this.descripcio);
        return msg;
    }

    public matar(): void
    {
        this.mort = true;
    }
}