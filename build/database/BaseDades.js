"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const colors_1 = require("colors");
//Funciona
class BaseDades {
    constructor(nomArxiu) {
        this.path = `././data/${nomArxiu}.json`;
        this.dataJson = "";
        this.json = {};
    }
    async agafar() {
        const data = await fs_1.default.readFileSync(this.path);
        this.dataJson = data.toString();
        this.json = JSON.parse(this.dataJson);
        console.log(colors_1.red(`S'ha agafar base de dades ${this.path}`));
        console.log(colors_1.red("Contingut:"));
        console.log(colors_1.bold(colors_1.red("-------------------------------------------------------------------------------------------------------------------------------")));
        console.table(this.json);
        console.log(colors_1.bold(colors_1.red("-------------------------------------------------------------------------------------------------------------------------------")));
    }
    async guardar() {
        this.dataJson = JSON.stringify(this.json);
        await fs_1.default.writeFileSync(this.path, this.dataJson);
    }
}
exports.BaseDades = BaseDades;
