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
        else {
            await this.reiniciar();
        }
        return false;
    }
    async reiniciar() {
        this.command = "";
        this.contingut = [];
    }
    async shaCridat(msg) {
        if (msg.length > this.cridat.length) {
            const tros = await this.slice(msg, 0, this.cridat.length);
            return this.cridat == tros;
        }
        return false;
    }
    async agafarComando(msg) {
        const partComando = await this.slice(msg, this.cridat.length);
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
        const contingut = await this.slice(msg, llocOnTallar); // Sino hi haura el començament de la array una "" extra
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
    async slice(txt, n1, n2) {
        let tros;
        if (n2) {
            tros = txt.slice(n1, n2);
        }
        else {
            tros = txt.slice(n1);
        }
        return tros;
    }
}
exports.Separador = Separador;
