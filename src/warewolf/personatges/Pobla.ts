import { Personatge, RolEvent } from "./Personatge";
import { Usuari } from "../../usuaris/Usuari";
import { WareWolf } from "../WareWolf";

export class Pobla extends Personatge {
    public rol: string = "pobla";

    constructor(usuari: Usuari, warewolf: WareWolf)
    {
        super(usuari, "pobla", "Descripcio", warewolf);
    }
}