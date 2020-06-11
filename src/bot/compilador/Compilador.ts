
export class Compilador {


    constructor()
    {

    }

    public async treuraId(idBrut:string): Promise<string>
    {
        let id: string = idBrut;

        if(idBrut.includes("<")){
            if(idBrut.includes("!")){
                id = idBrut.split("!")[1].split(">")[0];
            }else if(idBrut.includes("@")){
                id = idBrut.split("@")[1].split(">")[0];
            }
        }

        return id;
    }

    public async treuraNom(nomBrut: string): Promise<string>
    {
        let nom: string = "";

        nom = nomBrut.split("#")[0];

        return nom;
    }
}