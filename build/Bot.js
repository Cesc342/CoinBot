"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./bot/Command");
const Separador_1 = require("./bot/Separador");
const discord_js_1 = require("discord.js");
const colors_1 = require("colors");
class Bot extends discord_js_1.Client {
    constructor(cridat) {
        super();
        this.commands = new Map();
        this.cridat = cridat;
        this.separador = new Separador_1.Separador(this.cridat);
        this.prepararMissatges();
    }
    async prepararBot() {
        await this.prepararMissatges();
    }
    prepararMissatges() {
        this.on("message", async (msg) => {
            await this.separador.separarMissatge(msg.content);
            let commandStr = this.separador.command;
            let command = this.commands.get(commandStr);
            if (command) {
                command.on(this.separador.contingut, msg);
            }
            else {
                console.error(colors_1.magenta(`El command ${commandStr} no funciona`));
            }
        });
    }
    onMissatge(commandStr, esdeveniment) {
        let command = new Command_1.Command(commandStr, esdeveniment);
        this.commands.set(commandStr, command);
    }
}
exports.Bot = Bot;
