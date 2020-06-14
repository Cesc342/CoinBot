"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Objecta_1 = require("../economia/objectes/Objecta");
const Llistes_1 = require("../database/Llistes");
const AfectesListener_1 = require("../economia/objectes/afectes/AfectesListener");
class Inventori extends Llistes_1.Llistes {
    constructor({ id, objectes }, usuari) {
        super();
        this.afectesListener = new AfectesListener_1.AfectesListener();
        this.id = id;
        this.afectesListener.cargar().then(() => {
            for (let idObj in objectes) {
                let dataObj = objectes[idObj];
                let obj = new Objecta_1.Objecta(usuari, dataObj.nom, dataObj.num, dataObj.detalls);
                this.cargarAfectesObj(obj).then(() => {
                    this.set(obj.nom, obj);
                });
            }
        });
        this.usuari = usuari;
    }
    async cargarAfectesObj(objecta) {
        let afectes = await this.afectesListener.agafarAfectes(objecta.nom);
        if (afectes) {
            objecta.afectes = afectes;
        }
    }
    async agafarInventori() {
        let dadesObjectes = {};
        await this.forEachAsync(async (obj, nom) => {
            console.table();
            dadesObjectes[nom] = await obj.agafarDades();
        });
        let data = {
            id: this.id,
            objectes: dadesObjectes
        };
        return data;
    }
}
exports.Inventori = Inventori;
