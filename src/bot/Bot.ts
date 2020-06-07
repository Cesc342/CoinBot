import { Command, Esdeveniment } from "./esdeveniments/Command"
import { Separador } from "./compilador/Separador";

import { Client, Message, User, ClientEvents } from "discord.js";

import { magenta, red, green } from "colors";
import { Handler } from "./esdeveniments/Handler";
import { bot } from "../Bot";
import { Compilador } from "./compilador/Compilador";
import { Tenda } from "../economia/Tenda";

type EventDiscord = 'collect' | 'dispose' | 'end' | 'collect' | 'dispose' | 'remove' | 'spawn' | 'death' | 'disconnect' | 'ready' | 'reconnecting' | 'error' | 'message' | 'shardCreate' | 'close' | 'drain' | 'finish' | 'start' | 'debug' | 'error' | 'pipe' | 'unpipe' | 'speaking' | 'volumeChange' | 'end' | 'subscribe' | 'unsubscribe' | 'authenticated' | 'closing' | 'newSession' | 'ready' | 'reconnecting' | 'debug' | 'error' | 'failed' | 'disconnect' | 'speaking' | 'warn' | 'debug' | 'volumeChange' | 'ready' | 'resumed' | 'invalidSession' | 'close' | 'allReady';

export class Bot extends Client
{
    public cridat: string;
    public usuari: User = new User(new Client(), {}); // Carga un usuari que no existeix per despres agafar el seu
    private jaActivat: boolean = false;

    public separador: Separador;
    private handler: Map<string, Handler> = new Map();
    public compilador: Compilador = new Compilador();

    constructor(cridat: string, cargar?: ()=>void)
    {
        super();
        this.cridat = cridat;
        this.separador = new Separador( this.cridat );

        if(cargar){
            this.on("ready", cargar);
        }
    }


    public async prepararBot(token: string): Promise<void>
    {
        console.log(green(`--> Ha iniciat la sessio`));
        await this.prepararEvents();
        console.log(green("--> Bot Preparat"));
        await this.login(token);
        console.log(green(`--> Ha iniciat la sessio`));
        await this.agafarUsuari();
        console.log(green(`--> Bot Cargat`));
        console.log("");
    }

    private async prepararEvents(): Promise<void>
    {
        this.handler.forEach(async (handler, event: any | string)=>{
            try{
                await this.nouEvent(handler, event);
            }catch (error){
                console.log(`El evento ${event} no funciona`);
            }
        })
    }

    private async nouEvent(handler: Handler, event: any | string): Promise<void>
    {
        this.on(event, async (msg: Message)=>{
            if(!(this.usuari.tag == msg.author.tag || this.jaActivat)){
                this.jaActivat = true;

                await this.separador.separarMissatge(msg.content);
                let commandStr: string = this.separador.command;
                let command: Command | undefined = handler.get(commandStr);

                if(command){
                    await command.on(this.separador.contingut, msg);
                }else{
                    console.error(magenta(`El command ${ commandStr } no funciona`));
                }

                this.jaActivat = false;
            }
        })
    }

    private async agafarUsuari(): Promise<void>
    {
        if(this.user){
            this.usuari = this.user;
        }else{
            console.log(red("NO ES POT CARRAGAR L'USUARI DEL BOT"));
        }
    }


    public afegirEvent(event: EventDiscord, commandStr: string, esdeveniment: Esdeveniment): void
    {
        let command: Command = new Command(commandStr, esdeveniment);
        let handler: Handler | undefined = this.handler.get(event);

        if(!handler){
            handler = new Handler();
            this.handler.set(event, handler);
        }

        handler.afegirEsdeveniment(command);
    }
}