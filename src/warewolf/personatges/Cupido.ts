import { Personatge } from "./Personatge";
import { Usuari } from "../../usuaris/Usuari";

export class Cupido extends Personatge{
    constructor(usuari: Usuari)
    {
        super(usuari, "Cupido");
    }
}