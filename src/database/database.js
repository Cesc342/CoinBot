const fs = require("fs");

class DataBase{
    constructor() {
        this.json = [];
    }

    async comprovarCreat(){
        for(i = 0; i < this.json.length; i++){
            if(this.json[i].id == id){
                return this.json[i];
            }
        }
        return null;
    }

    async iniciar(){
        let data = await fs.readFileSync("././data/data.json");
        let dataJson = data.toString();
        this.json = JSON.parse(dataJson);
    }

    //Agafar -->
    async agafar(id) {
        let data = await fs.readFileSync("././data/data.json");
        console.log("data: " + data);
        let dataJson = data.toString();
        console.log("dataJson: " + dataJson);
        this.json = JSON.parse(dataJson);
        console.table(this.json);
    }

    async donar(id, diners) {
        try{
            this.json[id].diners += diners;
        }catch (error){
            this.json[id] = {
                id: id,
                diners: diners
            };
        }
        console.table(this.json);
        await fs.writeFileSync("././data/data.json", JSON.stringify(this.json));
    }

}

module.exports = new DataBase();