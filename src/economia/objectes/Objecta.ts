export type DataObjecta = {
    nom: string,
    num: number,
    detalls: string,
}

export class Objecta implements DataObjecta{
    public nom: string;
    public num: number = 1;
    public detalls: string = "";


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
        return this.num >= num;
    }


    public obtenir(num: number): void
    {
        this.num += num;
    }
}