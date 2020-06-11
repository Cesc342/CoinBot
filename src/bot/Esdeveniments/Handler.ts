import { Command } from "./Command";

import { magenta } from "colors";
import { Message } from "discord.js";
import { Llistes } from "../../database/Llistes";


export class Handler extends Llistes<string, Command> {

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