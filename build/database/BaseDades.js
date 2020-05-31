"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
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
        console.table(this.json);
    }
    async guardar() {
        this.dataJson = JSON.stringify(this.json);
        await fs_1.default.writeFileSync(this.path, this.dataJson);
    }
}
exports.BaseDades = BaseDades;
