"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class Personatge {
    constructor(usuari, descripcio) {
        this.votacio = 0;
        this.potVotar = false;
        this.mort = false;
        this.usuari = usuari;
        this.descripcio = descripcio;
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
    matar() {
        this.mort = true;
    }
}
exports.Personatge = Personatge;
