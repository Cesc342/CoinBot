import { Llistes } from "../database/Llistes";
import { Pobla } from "./personatges/Pobla";
import { Compilador } from "../bot/compilador/Compilador";
import { Bruixa } from "./personatges/Bruixa";
import { Cupido } from "./personatges/Cupido";
import { Llob } from "./personatges/Llob";
import { DMChannel, Message, TextChannel, NewsChannel, Channel, User } from "discord.js";
import { Usuari } from "../usuaris/Usuari";


export type tipusPersonatges = Pobla | Bruixa | Cupido | Llob;
type canalsDiscord = DMChannel | TextChannel | NewsChannel;

export class WareWolf extends Llistes<string, tipusPersonatges> {
    public canal: canalsDiscord;
    public compilador: Compilador = new Compilador();
    public dia: boolean = true;

    constructor(llistaUsuaris: Usuari[], canal: canalsDiscord)
    {
        super();
        this.canal = canal;
        this.cargar(llistaUsuaris);
    }


    private async cargar(llistaUsuaris: Usuari[]): Promise<void>
    {
        let poblat: Pobla[] = [];
        console.table(llistaUsuaris);

        let llob_1 = new Llob(llistaUsuaris[0], this);
        let llob_2 = new Llob(llistaUsuaris[1], this);

        let cupido = new Cupido(llistaUsuaris[2], this);

        let bruixa = new Bruixa(llistaUsuaris[3], this);

        for(let n = 4; n < llistaUsuaris.length; n++){
            poblat.push(new Pobla(llistaUsuaris[n], this));
        }

        this.set(llob_1.usuari.tag, llob_1);
        this.set(llob_2.usuari.tag, llob_2);

        this.set(cupido.usuari.tag, cupido);

        for(let pobla of poblat){
            this.set(pobla.usuari.tag, pobla);
        }


        if(llistaUsuaris.length >= 4){
            console.log("Hi ha suficients");
        }else{
            console.log("NO");
        }
    }


    public async getById(idBrut: string): Promise<tipusPersonatges | undefined>
    {
        let id: string = await this.compilador.treuraId(idBrut);
        let usuari = await this.getAsync(id);
        return usuari;
    }

    public async setTimeoutAsync(funcio: ()=>void, ms?:number): Promise<void>
    {
        setTimeout(funcio, ms);
    }

    public async votar(id: string, idVotat: string): Promise<void>
    {
        let votador = await this.getById(id);
        let votat = await this.getById(idVotat);

        if(votador && votat){
            if(votador.potVotar){
                votat.votacio++;
                votador.potVotar = false;
            }
        }

        if(await this.tothomaAVotat()){
            this.dia = false;
            let mort: tipusPersonatges = await this.guanyadorVotacio();
            this.canal.send("Tothom a dormir");
        }
    }

    private async tothomaAVotat(): Promise<boolean>
    {
        let totAVot: boolean = true;
        await this.forEachAsync( (usuari)=> totAVot = (usuari.potVotar && totAVot) );
        return totAVot;
    }

    private async guanyadorVotacio(): Promise<tipusPersonatges>
    {
        let guanyador: any;
        let n = true;
        this.forEach((usuari)=>{
            if(n){
                guanyador = usuari;
                n = false;
            }else{
                if(usuari.votacio > guanyador.votacio){
                    guanyador = usuari;
                }
            }
        })

        return guanyador;
    }

    public async anunciarMort(personatge: tipusPersonatges): Promise<void>
    {
        this.canal.send(`${personatge.usuari.username} s'ha mort`);
    }
}