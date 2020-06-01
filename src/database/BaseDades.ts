import fs from "fs";
import {red, bold} from "colors";

export type Data = {
    dataJson: string,
    json: any
}

//Funciona

export class BaseDades implements Data {
    private path: string
    public dataJson: string;
    public json: any;


    constructor(nomArxiu: string)
    {
        this.path = `././data/${nomArxiu}.json`;
        this.dataJson = "";
        this.json = {};
    }

    public async agafar(): Promise<void>
    {
        const data: any = await fs.readFileSync(this.path);
        this.dataJson = data.toString();
        this.json = JSON.parse( this.dataJson );

        console.log(red(`S'ha agafar base de dades ${this.path}`));
        console.log(red("Contingut:"));
        console.log(bold(red("-------------------------------------------------------------------------------------------------------------------------------")));
                                                                        console.table(this.json);
        console.log(bold(red("-------------------------------------------------------------------------------------------------------------------------------")));
    }

    public async guardar(): Promise<void>
    {
        this.dataJson = JSON.stringify( this.json );
        await fs.writeFileSync( this.path, this.dataJson );
    }
}