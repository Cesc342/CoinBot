import { Data } from "ws";
import { disable } from "colors";

export type DataTemps = {
    dies: number,
    segons: number,
    minuts: number,
    hores: number
}

export class Temps extends Date implements DataTemps{

    public segons: number = 0;
    public minuts: number = 0;
    public hores: number = 0;
    public dies: number = 0;

    public total: number = 0;


    constructor()
    {
        super();
        this.agafarHMS();
    }


    public async agafarHMS(): Promise<void> // Agafar Hores Minuts i Segons
    {
        this.dies = this.getDay();
        this.segons = this.getSeconds();
        this.minuts = this.getMinutes();
        this.hores = this.getHours();
        this.total = this.HMS_S(this.dies, this.hores, this.minuts, this.segons);
    }


    public HMS_S(dia: number, hores: number, minuts: number, segons: number): number // Hores Minuts i Segons  __"a"__ Segons
    {
        let total = 0;
        total += dia * 24 * 60 * 60;
        total += hores * 60 * 60;
        total += minuts * 60;
        total += segons;

        return total;
    }

    public S_HMS(total: number): DataTemps
    {
        let diesBruts = total / (24 * 60 * 60);
        let dies = Math.floor(diesBruts);
        let diesResidu = diesBruts - dies;

        let horesBrutes = diesResidu * 24;
        let hores = Math.floor(horesBrutes);
        let horesResidu = horesBrutes - hores;

        let minutsBruts = horesResidu * 60;
        let minuts = Math.floor(minutsBruts);
        let minutsResidu = minutsBruts - minuts;

        let segonsBruts = minutsResidu * 60;
        let segons = Math.floor(segonsBruts);


        let data: DataTemps = {
            dies: dies,
            hores: hores,
            minuts: minuts,
            segons: segons
        };

        return data;
    }


    public async comperar(dies: number, hores: number, minuts: number, segons: number): Promise<number>
    {
        await this.agafarHMS();

        let totalPerComparar: number = this.HMS_S(dies, hores, minuts, segons);

        return this.total - totalPerComparar;
    }
}