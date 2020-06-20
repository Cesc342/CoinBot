import { Personatge } from "./Personatge";
import { Usuari } from "../../usuaris/Usuari";

export class Llob extends Personatge{

    constructor(usuari: Usuari)
    {
        super(usuari, "Descripcio");
    }
}