import { Inventori, DadesInventari } from "./Inventori";
import { User, Client } from "discord.js";
import { Temps } from "./temps/Temps";

export type DadesUsuari = {
    id: string,
    diners: number,
    banc:number,
    impostos: number
}

export class Usuari extends User implements DadesUsuari{
    public id: string;
    public diners: number = 0;
    public banc: number = 0;

    public inventori: Inventori;
    public temps: Temps = new Temps();

    public tempsTreballar: number = 0;

    public impostos: number = 0.1; //Quant treu el banc cada vegada que guardes els diners 
    public posRobar: number = 0.2;

    constructor(user: User, {id, diners, banc, impostos}: DadesUsuari, dadesInv: DadesInventari)
    {
        super(user.client, user);
        this.id = id;
        this.inventori = new Inventori(dadesInv, this);

        //Ho he fet aixi perque el valor diners no dongui negatiu
        this.sumarDiners(diners);
        this.banc = banc;
        this.impostos = impostos;
    }

    public implentarDades({id, diners, banc}: DadesUsuari, dadesInv: DadesInventari): void
    {
        this.id = id;
        this.inventori = new Inventori(dadesInv, this);

        //Ho he fet aixi perque el valor diners no dongui negatiu
        this.diners = diners;
        this.banc = banc;
    }


    //Es boolean perque comprova si s'ha pogut treure el diners o no
    //(De moment no vull donar la possibilitat de bancarrota)
    public restarDiners(diners: number): boolean
    {
        if(this.esPositiu(diners)){
            const dinersAbans: number = this.diners;

            const dinersDespres: number = dinersAbans - diners;

            if(dinersDespres >= 0){
                this.diners = dinersDespres;
                return true;
            }else{
                return false;
            }
        }

        return false;
    }

    public sumarDiners(diners: number): void
    {
        if(this.esPositiu(diners)){
            this.diners += diners;
        }
    }


    public ficarBanc(diners: number): boolean
    {
        if(this.esPositiu(diners)){
            const dinersImpostats: number = this.impostBanc(diners);

            if(this.restarDiners( diners + dinersImpostats )){
                this.banc += diners;
                console.log(`Els impostos han tret: ${dinersImpostats}$`)
                return true;
            }else{
                return false;
            }
        }

        return false;
    }

    public treuraBanc(diners: number): boolean
    {
        if(this.esPositiu(diners)){
            if(diners <= this.banc){
                this.banc -= diners;
                this.sumarDiners(diners);
                return true;
            }
            return false;
        }
        return false;
    }

    private impostBanc(diners: number): number
    {
        return Math.round( diners * this.impostos );
    }


    public async agafarDadesUsuari(): Promise<DadesUsuari>
    {
        const dadesUsuari: DadesUsuari = {
            id: this.id,
            diners: this.diners,
            banc: this.banc,
            impostos: this.impostos
        };

        return dadesUsuari;
    }


    private esPositiu(num: number): boolean
    {
        return num >= 0;
    }


    public treballar(): number
    {
        let r: number = Math.random() * 500 + 50;
        let diners: number = Math.round(r);

        this.sumarDiners(diners);
        return diners;
    }


    public async robar(usuari: Usuari): Promise<boolean | undefined>
    {
        let robarB: number = Math.random();
        if(robarB < this.posRobar){
            let r = Math.random() * 1000;
            let diners: number = Math.round(r);
            let possible: boolean = usuari.restarDiners(diners);

            if(possible){
                this.sumarDiners(diners);
            }
            return possible;
        }
    }

}
