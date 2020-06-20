"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        return this.descripcio;
    }
    matar() {
        this.mort = true;
    }
}
exports.Personatge = Personatge;
