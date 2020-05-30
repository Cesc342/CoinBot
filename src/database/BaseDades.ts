import fs from "fs";

/*class DataBase{
    public json: any;
    private link: string;
    constructor() {
        this.link = "././data/data.json";
    }

    async comprovarCreat(id: string){
        for(let i = 0; i < this.json.length; i++){
            if(this.json[i].id == id){
                return this.json[i];
            }
        }
        return null;
    }

    async iniciar(){
        let data = await fs.readFileSync(this.link);
        let dataJson = data.toString();
        this.json = JSON.parse(dataJson);
    }

    //Agafar -->
    async agafar(id: string) {
        let data = await fs.readFileSync(this.link);
        console.log("data: " + data);
        let dataJson = data.toString();
        console.log("dataJson: " + dataJson);
        this.json = JSON.parse(dataJson);
        console.table(this.json);
    }

    async donar(id: string, diners: number, tag: string) {
        try{
            this.json[id].diners += diners;
        }catch (error){
            this.json[id] = {
                id: id,
                diners: diners,
                tag: tag
            };
        }
        console.table(this.json);
        await fs.writeFileSync(this.link, JSON.stringify(this.json));
    }

}
*/

export interface Data{
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
        console.table(this.json);
    }

    public async guardar(): Promise<void>
    {
        this.dataJson = JSON.stringify( this.json );
        await fs.writeFileSync( this.path, this.dataJson );
    }
}