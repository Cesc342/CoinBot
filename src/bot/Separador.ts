
export class Separador
{
    public cridat: string;
    public command: string = "";
    public contingut: string[] = [];

    constructor(cridat: string)
    {
        this.cridat = cridat;
    }


    public async separarMissatge(msg: string): Promise<boolean>
    {
        if(await this.shaCridat(msg)){
            await this.agafarComando(msg);
            await this.agafarContingut(msg);
            return true;
        }

        return false;
    }

    private async shaCridat(msg: string): Promise<boolean>
    {
        if(msg.length > this.cridat.length){
            const tros: string = await this.slice(msg, 0, this.cridat.length);
            return this.cridat == tros;
        }
        return false;
    }

    private async agafarComando(msg: string): Promise<void>
    {
        const partComando = await this.slice(msg, this.cridat.length)
        let tros: string = "";

        for(let lletra of partComando){
            if(lletra == " "){
                break;
            }

            tros += lletra;
        }

        this.command = tros;
    }

    private async agafarContingut(msg: string): Promise<void>
    {
        const llocOnTallar: number = this.cridat.length + this.command.length + 1; // "+ 1" per eliminar el espai quan es separa amb el commando i el cridat
        const contingut: string = await this.slice(msg, llocOnTallar);                         // Sino hi haura el començament de la array una "" extra
        let tros: string = "";
        let contingutMissatge: string[] = [];

        for(let lletra of contingut){
            if(lletra == " "){
                contingutMissatge.push(tros);
                tros = "";
            }else{
                tros += lletra;
            }
        }

        contingutMissatge.push(tros);

        this.contingut = contingutMissatge;
    }

    private async slice(txt: string, n1: number, n2?: number): Promise<string> // Perque al comprovar donava sempre true
    {                                                                          // perque ho tornava despres el string
        let tros: string;
        if(n2){
            tros = txt.slice(n1, n2);
        }else{
            tros = txt.slice(n1);
        }
        return tros;
    }
}