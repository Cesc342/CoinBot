export interface DataUsuari {
    id: string,
    diners: number,
    banc:number
}

export class Usuari implements DataUsuari{
    public id: string;
    public diners: number = 0;
    public banc: number = 0;

    public treuBanc: number = 0.1;

    constructor({id, diners, banc}: DataUsuari)
    {
        this.id = id;

        //Ho he fet aixi perque el valor diners no dongui negatiu
        this.sumarDiners(diners + banc);
        this.ficarBanc(banc);
    }


    //Es boolean perque comprova si s'ha pogut treure el diners o no
    //(De moment no vull donar la possibilitat de bancarrota)
    public restarDiners(diners: number): boolean
    {
        const dinersAbans: number = this.diners;

        const dinersDespres: number = dinersAbans - diners;

        if(dinersDespres >= 0){
            this.diners = dinersDespres;
            return true;
        }else{
            return false;
        }
    }

    public sumarDiners(diners: number): void
    {
        this.diners += diners;
    }


    public ficarBanc(diners: number): boolean
    {
        if(this.restarDiners(diners)){
            this.banc += diners;
            return true;
        }else{
            return false;
        }
    }

    public treuraBanc(diners: number): boolean
    {
        if(diners <= this.banc){
            this.banc -= diners;
            this.sumarDiners(diners);
            return true;
        }
        return false;
    }
}
