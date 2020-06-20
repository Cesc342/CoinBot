import { Personatge } from "./Personatge";
import { Usuari } from "../../usuaris/Usuari";

export class Bruixa extends Personatge{
    
    constructor(usuari: Usuari)
    {
        super(usuari, "Bruixa AAAAAAAAAAAAAAAA");
    }
}