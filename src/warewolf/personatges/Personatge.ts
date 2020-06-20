import { Usuari } from "../../usuaris/Usuari";
import { MessageEmbed, User, Message, Client } from "discord.js";
import { WareWolf, tipusPersonatges } from "../WareWolf";


export type RolEvent = (cont: string[], msg: Message)=>Promise<boolean>;

export class Personatge {
    public usuari: Usuari;
    public warewolf: WareWolf;

    public descripcio: string;
    public rol: string;

    public votacio: number = 0;

    public potVotar: boolean = false;
    public potFerAccio: boolean = false;
    public enamorat: tipusPersonatges | undefined;

    public set mort(b: boolean)
    {
        this.mort = b;

        if(this.enamorat){
            if(!this.enamorat.mort){
                this.enamorat.mort = b;
            }
        }

        if(b){
            this.warewolf.anunciarMort(this);
        }
    }

    public get mort(): boolean
    {
        return this.mort
    }

    public rolEvent: RolEvent | undefined;

    constructor(usuari: Usuari, rol: string, descripcio: string, warewolf: WareWolf)
    {
        this.usuari = usuari;
        this.warewolf = warewolf;
        this.rol = rol;
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


    public async accio(cont: string[], msg: Message): Promise<void>
    {
        if(this.potFerAccio && this.rolEvent){
            let error = await this.rolEvent(cont, msg);
            if(error){
                msg.author.send(`El teu rol es ${this.rol}`);
                msg.author.send(`bot!help ${this.rol}`);
            }
        }else{
            msg.author.send(this.help());
        }
    }

    public async ficarEvent(rolEvent: RolEvent)
    {
        this.rolEvent = rolEvent;
    }
}