import { Usuari } from "../../usuaris/Usuari";

export class Personatge {
    public usuari: Usuari;
    public descripcio: string;
    public votacio: number = 0;
    public potVotar: boolean = false;
    public mort: boolean = false;


    constructor(usuari: Usuari, descripcio: string)
    {
        this.usuari = usuari;
        this.descripcio = descripcio;
    }


    public votar(usuari: Personatge): boolean
    {
        if(this.potVotar && !this.mort){
            usuari.votacio++;
            this.potVotar = false;
            return true;
        }
        return false;
    }

    public help(): string
    {
        return this.descripcio;
    }

    public matar(): void
    {
        this.mort = true;
    }
}