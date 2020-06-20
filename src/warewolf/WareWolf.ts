import { Llistes } from "../database/Llistes";
import { Pobla } from "./personatges/Pobla";
import { Compilador } from "../bot/compilador/Compilador";
import { Bruixa } from "./personatges/Bruixa";
import { Cupido } from "./personatges/Cupido";
import { Llob } from "./personatges/Llob";
import { DMChannel, Message, TextChannel, NewsChannel } from "discord.js";
import { Usuari } from "../usuaris/Usuari";


export type tipusPersonatges = Pobla | Bruixa | Cupido | Llob;
type canalsDiscord = DMChannel | TextChannel | NewsChannel;

export class WareWolf extends Llistes<string, tipusPersonatges> {
    public canal: canalsDiscord;
    public compilador: Compilador = new Compilador();

    public numRols = {
        poblat: 9,
        llob: 1
    }

    private diaB: boolean = true;

    public set dia(b: boolean)
    {
        if(b){
            this.forEach( (usuari)=>usuari.potVotar = true );
            this.canal.send("Hes ɖa ɖie");
        }else{
            this.forEach( (usuari)=>usuari.potFerAccio = true );
            this.canal.send("Hes ɖa ɖïd");
        }
        this.diaB = b;
    }

    public get dia()
    {
        return this.diaB;
    }


    constructor(llistaUsuaris: Usuari[], canal: canalsDiscord)
    {
        super();
        this.canal = canal;
        this.cargar(llistaUsuaris);
    }


    private async cargar(llistaUsuaris: Usuari[]): Promise<void>
    {
        let poblat: Pobla[] = [];
        this.dia = true;

        let llob_1 = new Llob(llistaUsuaris[0], this);
        await llistaUsuaris[0].createDM();
        llistaUsuaris[0].dmChannel.send(`Tu yöv`);

        let cupido = new Cupido(llistaUsuaris[1], this);
        await llistaUsuaris[1].createDM();
        llistaUsuaris[1].dmChannel.send(`Tu kùpýdò`);

        let bruixa = new Bruixa(llistaUsuaris[2], this);
        await llistaUsuaris[2].createDM();
        llistaUsuaris[2].dmChannel.send(`Tu vroyijá`);

        for(let n = 3; n < llistaUsuaris.length; n++){
            poblat.push(new Pobla(llistaUsuaris[n], this));
            await llistaUsuaris[n].createDM();
            llistaUsuaris[n].dmChannel.send(`Tu pövlè`);
        }

        this.set(llob_1.usuari.id, llob_1);

        this.set(cupido.usuari.id, cupido);

        this.set(bruixa.usuari.id, bruixa);

        for(let pobla of poblat){
            this.set(pobla.usuari.id, pobla);
        }


        if(llistaUsuaris.length >= 3){
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

        console.log("WareWolf");
        console.table(this);

        if(votador && votat){
            console.log("Pot votar: " + votador.potVotar);
            if(votador.potVotar){
                votat.votacio++;
                votador.potVotar = false;
            }
        }

        if(await this.tothomaAVotat()){
            this.dia = false;
            let mort: tipusPersonatges = await this.guanyadorVotacio();
            this.canal.send("Tutöm a ɖòrmyr");
        }
    }

    private async tothomaAVotat(): Promise<boolean>
    {
        let totAVot: boolean = true;
        await this.forEachAsync( (usuari)=> totAVot = (!usuari.potVotar && totAVot) );
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
        if(this.numRols.llob == 0){
            this.canal.send(`Han guanyat els llobs`);
        }else if(this.numRols.poblat == 0 || this.numRols.poblat > this.numRols.poblat){
            this.canal.send(`Heu matat a tots els llobs`);
        }
    }
}