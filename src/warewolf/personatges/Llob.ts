import { Personatge, RolEvent } from "./Personatge";
import { Usuari } from "../../usuaris/Usuari";
import { Message, MessageEmbed, User } from "discord.js";
import { WareWolf } from "../WareWolf";

export class Llob extends Personatge{
    public rol: string = "llob";

    constructor(usuari: Usuari, warewolf: WareWolf)
    {
        super(usuari, "llob","Descripcio", warewolf);
    }
}