import { Inventori, DadesInventari } from "../objectes/Inventori";

export interface DadesUsuari {
    id: string,
    diners: number,
    banc:number
}

export class Usuari implements DadesUsuari{
    public id: string;
    public diners: number = 0;
    public banc: number = 0;

    public inventori: Inventori;

    public impostos: number = 0.1; //Quant treu el banc cada vegada que guardes els diners


    constructor({id, diners, banc}: DadesUsuari, dadesInv: DadesInventari)
    {
        this.id = id;
        this.inventori = new Inventori(dadesInv);

        //Ho he fet aixi perque el valor diners no dongui negatiu
        this.sumarDiners(diners);
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


    public agafarDadesUsuari(): DadesUsuari
    {
        const dadesUsuari: DadesUsuari = {
            id: this.id,
            diners: this.diners,
            banc: this.banc
        };

        return dadesUsuari;
    }


    private esPositiu(num: number): boolean
    {
        return num >= 0;
    }
}
