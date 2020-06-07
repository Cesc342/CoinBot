"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDades_1 = require("../database/BaseDades");
const Producta_1 = require("./Producta");
class Tenda extends Map {
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
            let venedor = this.usuaris.get(prodJson.venedor);
            if (venedor) {
                let data = {
                    cost: prodJson.cost,
                    venedor: venedor,
                    nom: prodJson.nom,
                    detalls: prodJson.detalls,
                    num: parseInt(prodJson.num)
                };
                let producta = new Producta_1.Producta(data.nom);
                await producta.processarDades(data);
                this.set(id, producta);
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
        let producta = new Producta_1.Producta(objecta.nom, objecta.num, objecta.detalls);
        await producta.completarInfo(venedor, cost);
        this.set(producta.nom, producta);
        await this.guardar();
    }
    async forEachAsync(event) {
        this.forEach(event);
    }
}
exports.Tenda = Tenda;
