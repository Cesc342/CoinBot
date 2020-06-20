"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class Personatge {
    constructor(usuari, rol, descripcio, warewolf) {
        this.votacio = 0;
        this.potVotar = false;
        this.potFerAccio = false;
        this.usuari = usuari;
        this.warewolf = warewolf;
        this.rol = rol;
        this.descripcio = descripcio;
    }
    set mort(b) {
        this.mort = b;
        if (this.enamorat) {
            if (!this.enamorat.mort) {
                this.enamorat.mort = b;
            }
        }
        if (b) {
            this.warewolf.anunciarMort(this);
        }
    }
    get mort() {
        return this.mort;
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
        let msg = this.missatge(this.descripcio);
        return msg;
    }
    missatge(txt) {
        let msg = new discord_js_1.MessageEmbed();
        msg.addField("Descripcio", this.descripcio);
        return msg;
    }
    async accio(cont, msg) {
        if (this.potFerAccio && this.rolEvent) {
            let error = await this.rolEvent(cont, msg);
            if (error) {
                msg.author.send(`El teu rol es ${this.rol}`);
                msg.author.send(`bot!help ${this.rol}`);
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
