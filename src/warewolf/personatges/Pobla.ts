import { Personatge, RolEvent } from "./Personatge";
import { Usuari } from "../../usuaris/Usuari";
import { WareWolf } from "../WareWolf";
import { User } from "discord.js";

export class Pobla extends Personatge {
    public rol: string = "pobla";

    constructor(usuari: Usuari, warewolf: WareWolf)
    {
        super(usuari, "pobla", warewolf);
        this.puntsForts = "``Forma part dels que decideixen matar al llop i poden ser reviscuts per la bruixa.``";
        this.puntsFebles = "``Els pot matar el llop i poden ser eliminats durant la ronda d'eliminacions.``";
        this.urlImatge = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-Ekc1pOMl9_0%2FVy7l06V7V4I%2FAAAAAAAALgg%2F7LG7AO-6goQ6SU--XAMP_d_aXxnDORTdgCLcB%2Fs1600%2F112%252Bcenicero%252B%252B10.jpg&f=1&nofb=1";
    }
}