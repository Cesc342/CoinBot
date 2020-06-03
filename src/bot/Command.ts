import { Message } from "discord.js";

export type Esdeveniment = ( contingut: string[], missatge: Message ) => Promise<void>;


export class Command
{
    public command: string;
    private esdeveniment: Esdeveniment;


    constructor(command: string, esdeveniment: Esdeveniment)
    {
        this.command = command;
        this.esdeveniment = esdeveniment;
    }


    public async on(contingut: string[], msg: Message): Promise<void>
    {
        await this.esdeveniment(contingut, msg);
    }

}