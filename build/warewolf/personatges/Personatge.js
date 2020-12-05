"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Personatge {
    constructor(usuari, rol, warewolf, seguent) {
        this.vots = 0;
        this.potVotar = true;
        this.mortB = false;
        this.potMorir = false;
        this.potFerAccioB = false;
        this.usuari = usuari;
        this.usuari.createDM();
        this.warewolf = warewolf;
        this.rol = rol;
        this.seguent = seguent;
    }
    set mort(b) {
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
    set potFerAccio(b) {
        if (b && !this.mort) {
            this.usuari.dmChannel.send("Utilitza bot!j per utilitzar el teu rol");
        }
        if (this.mort) {
            this.usuari.dmChannel.send("S'ha suposa que els morts no parlen");
        }
        this.potFerAccioB = b;
    }
    get potFerAccio() {
        return this.potFerAccioB;
    }
    votar(usuari) {
        if (this.potVotar && !this.mort) {
            usuari.vots++;
            this.potVotar = false;
            return true;
        }
        return false;
    }
    async accio(cont, msg) {
        if (this.potFerAccio && this.rolEvent) {
            let error = await this.rolEvent(cont, msg);
            if (error) {
                msg.author.send(`El teu rol es ${this.rol}`);
                msg.author.send(`bot!help ${this.rol}`);
            }
            else {
                this.next();
            }
        }
        else {
            let missatge = this.warewolf.helpMessage.help(this.rol);
            if (missatge) {
                msg.author.send(missatge);
            }
        }
    }
    async ficarEvent(rolEvent) {
        this.rolEvent = rolEvent;
    }
    next() {
        this.potFerAccio = false;
        if (this.seguent) {
            this.seguent.potFerAccio = true;
        }
        else {
            this.warewolf.dia = true; // Quant acaba de haver-hi un "seguent" per fer accio per la nit
        }
    }
}
exports.Personatge = Personatge;
