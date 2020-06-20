"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Llistes_1 = require("../../../database/Llistes");
const BaseDades_1 = require("../../../database/BaseDades");
class AfectesListener extends Llistes_1.Llistes {
    constructor() {
        super();
        this.moldeFuncions = new Llistes_1.Llistes();
        this.set("PUJAR_IMPOSTOS", ({ afector }) => {
            afector.impostos = afector.impostos * 2;
        });
        this.set("BAIXAR_IMPOSTOS", ({ afector }) => {
            afector.impostos = afector.impostos / 2;
        });
        this.set("MES_POSSIBILITATS_ROBAR", ({ afector }) => {
            afector.posRobar += 0.05;
        });
        this.set("MENYS_POSSIBILITATS_ROBAR", ({ afector }) => {
            afector.posRobar -= 0.05;
        });
        this.set("TORNAR_UTILITZAR", ({ objecta }) => {
            objecta.num++;
        });
    }
    async cargar() {
        let dataAfectes = new BaseDades_1.BaseDades("objectes");
        await dataAfectes.agafar();
        for (let obj in dataAfectes.json) {
            this.moldeFuncions.set(obj, dataAfectes.json[obj]);
        }
    }
    async agafarAfectes(nom) {
        let llistaAfectes = await this.moldeFuncions.getAsync(nom);
        let llista = [];
        if (llistaAfectes) {
            for (let nomAfecta in llistaAfectes) {
                let activar = llistaAfectes[nomAfecta];
                if (activar) {
                    let afecta = await this.getAsync(nomAfecta);
                    if (afecta) {
                        llista.push(afecta);
                    }
                }
            }
        }
        if (llista.length > 0) {
            return llista;
        }
        else {
            return undefined;
        }
    }
}
exports.AfectesListener = AfectesListener;
