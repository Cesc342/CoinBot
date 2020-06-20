import { Personatge } from "./Personatge";
import { Usuari } from "../../usuaris/Usuari";

export class Pobla extends Personatge {
    public votacions: number = 0;

    constructor(usuari: Usuari)
    {
        super(usuari, "Descripcio");
    }
}