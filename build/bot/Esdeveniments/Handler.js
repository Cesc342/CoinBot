"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("colors");
const Llistes_1 = require("../../database/Llistes");
class Handler extends Llistes_1.Llistes {
    constructor() {
        super();
    }
    async afegirEsdeveniment(command) {
        this.set(command.command, command);
    }
    async on(command, contingut, msg) {
        let commando = this.get(command);
        if (commando) {
            commando.on(contingut, msg);
        }
        else {
            console.log(colors_1.magenta(`El comando ${command} no existeix`));
        }
    }
}
exports.Handler = Handler;
