import { Bot } from "./bot/Bot";
import { Usuaris } from "./usuaris/Usuaris";
import { Tenda } from "./economia/Tenda";
import { User } from "discord.js";
import { WareWolf } from "./warewolf/WareWolf";


export class CoinBot extends Bot {
    public usuaris: Usuaris;
    public tenda: Tenda;
    public warewolf: WareWolf;


    constructor(cridar: string, cargar?: ()=>void){
        super(cridar, cargar);
        this.usuaris = new Usuaris();
        this.tenda = new Tenda(this.usuaris);
        this.warewolf = new WareWolf([]);
    }


    public async cargarTot(cargartot?: boolean)
    {
        if(cargartot){
            await this.usuaris.agafar(this);
        }else{
            await this.usuaris.agafar();
        }
        await this.tenda.agafar();
    }

    public async guardarTot()
    {
        await this.usuaris.guardar();
        await this.tenda.guardar();
    }
}