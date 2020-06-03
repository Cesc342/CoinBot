import { Command } from "./Command";

import { magenta } from "colors";
import { Message } from "discord.js";


export class Handler extends Map<string, Command> {
    public commands: Map<string, Command> = new Map();

    constructor()
    {
        super();
    }

    public async afegirEsdeveniment(command: Command): Promise<void>
    {
        this.set(command.command, command);
    }

    public async on(command: string, contingut: string[], msg: Message): Promise<void>
    {
        let commando: Command | undefined = this.get(command);

        if(commando){
            commando.on(contingut, msg);
        }else{
            console.log(magenta(`El comando ${command} no existeix`));
        }
    }
}