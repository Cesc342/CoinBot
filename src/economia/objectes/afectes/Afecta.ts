import { Usuari } from "../../../usuaris/Usuari";
import { Objecta } from "../Objecta";


export class Afecta {
    public objecta: Objecta;
    public afector: Usuari;
    public receptor: Usuari | undefined;

    constructor (objecta: Objecta, afector: Usuari, receptor?: Usuari)
    {
        this.afector = afector;
        this.receptor = receptor;
        this.objecta = objecta;
    }
}