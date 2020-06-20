"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class Personatge {
    constructor(usuari, rol, warewolf) {
        this.puntsForts = "";
        this.puntsFebles = "";
        this.urlImatge = "";
        this.votacio = 0;
        this.potVotar = true;
        this.potFerAccio = false;
        this.mortB = false;
        this.usuari = usuari;
        this.warewolf = warewolf;
        this.rol = rol;
    }
    set mort(b) {
        if (this.rol == "llob") {
            this.warewolf.numRols.llob--;
        }
        else {
            this.warewolf.numRols.poblat--;
        }
        if (this.enamorat) {
            if (!this.enamorat.mort) {
                this.enamorat.mort = b;
            }
        }
        if (b) {
            this.warewolf.anunciarMort(this);
        }
        this.mortB = b;
    }
    get mort() {
        return this.mortB;
    }
    votar(usuari) {
        if (this.potVotar && !this.mort) {
            usuari.votacio++;
            this.potVotar = false;
            return true;
        }
        return false;
    }
    help() {
        let msg = new discord_js_1.MessageEmbed({ title: `Descripcio de ${this.rol}`, description: "\~\~\~\~\~\~", color: "#ff0000" });
        msg.addField("Punts forts:", this.puntsForts);
        msg.addField("Punts febles: ", this.puntsFebles);
        msg.setThumbnail(this.urlImatge);
        return msg;
    }
    async accio(cont, msg) {
        if (this.potFerAccio && this.rolEvent) {
            let error = await this.rolEvent(cont, msg);
            if (error) {
                msg.author.send(`El teu rol es ${this.rol}`);
                msg.author.send(`bot!help ${this.rol}`);
            }
            else {
                this.potFerAccio = false;
            }
        }
        else {
            msg.author.send(this.help());
        }
    }
    async ficarEvent(rolEvent) {
        this.rolEvent = rolEvent;
    }
}
exports.Personatge = Personatge;
