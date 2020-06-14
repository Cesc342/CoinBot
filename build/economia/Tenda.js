"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDades_1 = require("../database/BaseDades");
const Producta_1 = require("./objectes/Producta");
const Llistes_1 = require("../database/Llistes");
class Tenda extends Llistes_1.Llistes {
    constructor(usuaris) {
        super();
        this.dataTenda = new BaseDades_1.BaseDades("tenda");
        this.usuaris = usuaris;
    }
    async agafar() {
        await this.usuaris.agafar();
        await this.dataTenda.agafar();
        const dataTend = this.dataTenda.json;
        for (let id in dataTend) {
            let prodJson = dataTend[id];
            let venedor = await this.usuaris.getAsync(prodJson.venedor);
            if (venedor) {
                let data = {
                    cost: prodJson.cost,
                    venedor: venedor,
                    nom: prodJson.nom,
                    detalls: prodJson.detalls,
                    num: parseInt(prodJson.num)
                };
                let producta = new Producta_1.Producta(venedor, data.nom);
                await producta.processarDades(data);
                this.setAsync(id, producta);
            }
        }
    }
    async guardar() {
        let jsonUsu = this.dataTenda.json;
        await this.forEachAsync(async (producta, id) => {
            jsonUsu[id] = await producta.agafarDades();
        });
        this.dataTenda.json = jsonUsu;
        await this.dataTenda.guardar();
    }
    async nouProducta(objecta, venedor, cost) {
        let producta = new Producta_1.Producta(venedor, objecta.nom, objecta.num, objecta.detalls);
        await producta.completarInfo(venedor, cost);
        this.set(producta.nom, producta);
        await this.guardar();
    }
    async outTenda() {
        let txt = "---------------------- TENDA ---------------------- \n";
        this.forEachAsync((producta) => {
            txt += `Nom: ${producta.nom}  Cost: ${producta.cost}  Venedor: ${producta.venedor.username} \n`;
        });
        txt += "------------------------------------------------------";
        return txt;
    }
}
exports.Tenda = Tenda;
