"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Separador {
    constructor(cridat) {
        this.command = "";
        this.contingut = [];
        this.cridat = cridat;
    }
    async separarMissatge(msg) {
        if (await this.shaCridat(msg)) {
            await this.agafarComando(msg);
            await this.agafarContingut(msg);
            return true;
        }
        return false;
    }
    async shaCridat(msg) {
        if (msg.length > this.cridat.length) {
            const tros = msg.slice(0, this.cridat.length);
            return this.cridat == tros;
        }
        return false;
    }
    async agafarComando(msg) {
        const partComando = msg.slice(this.cridat.length);
        let tros = "";
        for (let lletra of partComando) {
            if (lletra == " ") {
                break;
            }
            tros += lletra;
        }
        this.command = tros;
    }
    async agafarContingut(msg) {
        const llocOnTallar = this.cridat.length + this.command.length + 1; // "+ 1" per eliminar el espai quan es separa amb el commando i el cridat
        const contingut = msg.slice(llocOnTallar); // Sino hi haura el començament de la array una "" extra
        let tros = "";
        let contingutMissatge = [];
        for (let lletra of contingut) {
            if (lletra == " ") {
                contingutMissatge.push(tros);
                tros = "";
            }
            else {
                tros += lletra;
            }
        }
        contingutMissatge.push(tros);
        this.contingut = contingutMissatge;
    }
}
exports.Separador = Separador;
