import { Command, Esdeveniment } from "./bot/Command"
import { Separador } from "./bot/Separador";

import { Client } from "discord.js";

import { magenta } from "colors";

export class Bot extends Client
{
    public cridat: string;

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
    }

    private prepararMissatges()
    {
        this.on("message", async (msg)=>{
            await this.separador.separarMissatge(msg.content);
            let commandStr: string = this.separador.command;
            let command: Command | undefined = this.commands.get(commandStr);

            if(command){
                command.on(this.separador.contingut, msg);
            }else{
                console.error(magenta(`El command ${ commandStr } no funciona`));
            }
        })
    }


    public onMissatge(commandStr: string, esdeveniment: Esdeveniment): void
    {
        let command: Command = new Command(commandStr, esdeveniment);
        this.commands.set(commandStr, command);
    }
}