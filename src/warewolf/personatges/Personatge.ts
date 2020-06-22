import { Usuari } from "../../usuaris/Usuari";
import { MessageEmbed, User, Message, Client, DMChannel } from "discord.js";
import { WareWolf, tipusPersonatges } from "../WareWolf";


export type RolEvent = (cont: string[], msg: Message)=>Promise<boolean>;

export class Personatge {
    public usuari: Usuari;
    public warewolf: WareWolf;
    public seguent: tipusPersonatges | undefined;

    public rol: string;
    public puntsForts: string = "";
    public puntsFebles: string = "";
    public urlImatge: string = "";

    public votacio: number = 0;

    public potVotar: boolean = true;
    public enamorat: tipusPersonatges | undefined;

    private mortB: boolean = false;
    public potMorir: boolean = false;
    public set mort(b: boolean)
    {
        if(this.enamorat){
            if(!this.enamorat.mort){
                this.enamorat.mort = b;
            }
        }

        if(b){
            this.warewolf.anunciarMort(this);
        }

        this.mortB = b;
    }
    public get mort(): boolean
    {
        return this.mortB;
    }


    private potFerAccioB: boolean = false;
    public set potFerAccio(b: boolean)
    {
        if(b){
            this.usuari.dmChannel.send("Utilitza bot!j per utilitzar el teu rol");
        }

        this.potFerAccioB = b;
    }
    public get porFerAccio()
    {
        return this.potFerAccioB;
    }


    public rolEvent: RolEvent | undefined;

    constructor(usuari: Usuari, rol: string, warewolf: WareWolf, seguent?: tipusPersonatges)
    {
        this.usuari = usuari;
        this.usuari.createDM();
        this.warewolf = warewolf;
        this.rol = rol;
        this.seguent = seguent;
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
        let msg: MessageEmbed = new MessageEmbed({title:`Descripcio de ${this.rol}`, description:"\~\~\~\~\~\~", color:"#ff0000"});
        msg.addField("Punts forts:", this.puntsForts);
        msg.addField("Punts febles: ", this.puntsFebles);
        msg.setThumbnail(this.urlImatge);
        return msg;
    }


    public async accio(cont: string[], msg: Message): Promise<void>
    {
        if(this.potFerAccio && this.rolEvent){
            let error = await this.rolEvent(cont, msg);
            if(error){
                msg.author.send(`El teu rol es ${this.rol}`);
                msg.author.send(`bot!help ${this.rol}`);
            }else{
                this.next();
            }
        }else{
            msg.author.send(this.help());
        }
    }

    public async ficarEvent(rolEvent: RolEvent)
    {
        this.rolEvent = rolEvent;
    }

    public next()
    {
        this.potFerAccio = false;
        if(this.seguent){
            this.seguent.potFerAccio = true;
        }else{
            this.warewolf.dia = true; // Quant acaba de haver-hi un "seguent" per fer accio per la nit
        }
    }
}