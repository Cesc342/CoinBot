export interface DataObjecta{
    nom: string,
    num: number,
    detalls: string,
}

export class Objecta implements DataObjecta{
    nom: string;
    num: number = 1;
    detalls: string = "";


    constructor(nom: string, num?: number, detalls?: string)
    {
        this.nom = nom;
        if(num){
            this.num = num;
        }
        if(detalls){
            this.detalls = detalls;
        }
    }


    public gastar(num: number): boolean
    {
        if(this.hiHaSuficients(num)){
            this.num -= num;
            return true;
        }

        return false;
    }

    private hiHaSuficients(num: number): boolean
    {
        return this.num <= num;
    }


    public obtenir(num: number): void
    {
        this.num += num;
    }

    public agafarDades(): DataObjecta
    {
        const data: DataObjecta = {
            nom: this.nom,
            num: this.num,
            detalls: this.detalls
        };

        return data;
    }
}