import { Command, Esdeveniment } from "./Command"
import { Separador } from "./Separador";

import { Client, Message, User } from "discord.js";

import { magenta, red } from "colors";

export class Bot extends Client
{
    public cridat: string;
    public usuari: User = new User(new Client(), {}); // Carga un usuari que no existeix per despres agafar el seu
    private jaActivat: boolean = false;

    public separador: Separador;
    private commands: Map<string, Command> = new Map();

    constructor(cridat: string)
    {
        super();
        this.cridat = cridat;
        this.separador = new Separador( this.cridat );

        this.prepararMissatges();
    }


    public async prepararBot(): Promise<void>
    {
        await this.prepararMissatges();
        await this.agafarUsuari();
    }

    private prepararMissatges()
    {
        this.on("message", async (msg)=>{
            if(!(this.usuari.tag == msg.author.tag || this.jaActivat)){
                this.jaActivat = true;

                await this.separador.separarMissatge(msg.content);
                let commandStr: string = this.separador.command;
                let command: Command | undefined = this.commands.get(commandStr);

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


    public onMissatge(commandStr: string, esdeveniment: Esdeveniment): void
    {
        let command: Command = new Command(commandStr, esdeveniment);
        this.commands.set(commandStr, command);
    }
}