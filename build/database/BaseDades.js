"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    agafar() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fs_1.default.readFileSync(this.path);
            this.dataJson = data.toString();
            this.json = JSON.parse(this.dataJson);
            console.table(this.json);
        });
    }
    guardar() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dataJson = JSON.stringify(this.json);
            yield fs_1.default.writeFileSync(this.path, this.dataJson);
        });
    }
}
exports.BaseDades = BaseDades;
