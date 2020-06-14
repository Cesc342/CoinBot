"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Llistes_1 = require("../../../database/Llistes");
const BaseDades_1 = require("../../../database/BaseDades");
class FuncionsAfectes extends Llistes_1.Llistes {
    constructor() {
        super();
        this.moldeFuncions = new Map();
        this.cargar();
        this.set("PUJAR_IMPOSTOS", (usuari) => {
            console.log("Hola");
        });
        this.set("BAIXAR_IMPOSTOS", () => {
            console.log("Adeu");
        });
        this.set("MES_POSSIBILITATS_ROBAR", () => {
            console.log("Si");
        });
        this.set("MENYS_POSSIBILITATS_ROBAR", () => {
            console.log("No");
        });
    }
    async cargar() {
        let dataAfectes = new BaseDades_1.BaseDades("objectes");
        dataAfectes.agafar();
        for (let obj in dataAfectes.json) {
            this.moldeFuncions.set(obj, dataAfectes.json[obj]);
        }
    }
    async agafarAfectes(nom) {
        let llistaAfectes = this.moldeFuncions.get(nom);
        let llista = [];
        if (llistaAfectes) {
            for (let nomAfecta in llistaAfectes) {
                let activar = llistaAfectes[nomAfecta];
                if (activar) {
                    let afecta = this.moldeFuncions.get(nomAfecta);
                    if (afecta) {
                        llista.push(afecta);
                    }
                }
            }
        }
        if (llista.length == 0) {
            return llista;
        }
        else {
            return undefined;
        }
    }
}
exports.FuncionsAfectes = FuncionsAfectes;
