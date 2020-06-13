"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Objecta_1 = require("../economia/objectes/Objecta");
const Llistes_1 = require("../database/Llistes");
class Inventori extends Llistes_1.Llistes {
    constructor({ id, objectes }) {
        super();
        this.id = id;
        for (let idObj in objectes) {
            let dataObj = objectes[idObj];
            let obj = new Objecta_1.Objecta(dataObj.nom, dataObj.num, dataObj.detalls);
            this.set(obj.nom, obj);
        }
    }
    async agafarInventori() {
        let dadesObjectes = {};
        await this.forEachAsync(async (obj, nom) => {
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
