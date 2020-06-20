import { Temps, DataTemps } from "./Temps";

export type TempsLimit = {dies?: number, hores?: number, minuts?: number, segons: number};

export class Limit extends Temps {
    public diesL: number = 0;
    public horesL: number = 0;
    public minutsL: number = 0;
    public segonsL: number = 0;

    public totalL: number = 0;


    constructor(tempsLimit: TempsLimit)
    {
        super();
        this.cargar(tempsLimit);
    }

    public async cargar({dies, segons, minuts, hores}: TempsLimit): Promise<void>
    {
        await this.agafarHMS();

        this.diesL = await this.cargarUndefined(dies);
        this.horesL = await this.cargarUndefined(hores);
        this.minutsL = await this.cargarUndefined(minuts);
        this.segonsL = await this.cargarUndefined(segons);

        this.totalL = this.HMS_S(this.diesL, this.horesL, this.minutsL, this.segonsL);
    }

    private async cargarUndefined(numero: number | undefined): Promise<number> // Per fer-ho més ràpid
    {
        if(numero){
            return numero;
        }else{
            return 0;
        }
    }


    public async shaVencutLimit(): Promise<boolean>
    {
        await this.agafarHMS();
        return this.total <= this.totalL;
    }

    public async agafarData(): Promise<TempsLimit | undefined>
    {
        const vencut = await this.shaVencutLimit();

        if(!vencut){
            let data: TempsLimit = {
                dies: this.diesL,
                hores: this.horesL,
                minuts: this.minutsL,
                segons: this.segonsL
            }

            return data;
        }
    }
}