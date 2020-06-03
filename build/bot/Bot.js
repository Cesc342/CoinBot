"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Esdeveniments/Command");
const Separador_1 = require("./Esdeveniments/Separador");
const discord_js_1 = require("discord.js");
const colors_1 = require("colors");
const Handler_1 = require("./Esdeveniments/Handler");
class Bot extends discord_js_1.Client {
    constructor(cridat, cargar) {
        super();
        this.usuari = new discord_js_1.User(new discord_js_1.Client(), {}); // Carga un usuari que no existeix per despres agafar el seu
        this.jaActivat = false;
        this.handler = new Map();
        this.cridat = cridat;
        this.separador = new Separador_1.Separador(this.cridat);
        if (cargar) {
            this.on("ready", cargar);
        }
    }
    async prepararBot(token) {
        console.log(colors_1.green(`--> Ha iniciat la sessio`));
        await this.prepararEvents();
        console.log(colors_1.green("--> Bot Preparat"));
        await this.login(token);
        console.log(colors_1.green(`--> Ha iniciat la sessio`));
        await this.agafarUsuari();
        console.log(colors_1.green(`--> Bot Cargat`));
        console.log("");
    }
    async prepararEvents() {
        this.handler.forEach(async (handler, event) => {
            try {
                await this.nouEvent(handler, event);
            }
            catch (error) {
                console.log(`El evento ${event} no funciona`);
            }
        });
    }
    async nouEvent(handler, event) {
        this.on(event, async (msg) => {
            if (!(this.usuari.tag == msg.author.tag || this.jaActivat)) {
                this.jaActivat = true;
                await this.separador.separarMissatge(msg.content);
                let commandStr = this.separador.command;
                let command = handler.get(commandStr);
                if (command) {
                    await command.on(this.separador.contingut, msg);
                }
                else {
                    console.error(colors_1.magenta(`El command ${commandStr} no funciona`));
                }
                this.jaActivat = false;
            }
        });
    }
    async agafarUsuari() {
        if (this.user) {
            this.usuari = this.user;
        }
        else {
            console.log(colors_1.red("NO ES POT CARRAGAR L'USUARI DEL BOT"));
        }
    }
    afegirEvent(event, commandStr, esdeveniment) {
        let command = new Command_1.Command(commandStr, esdeveniment);
        let handler = this.handler.get(event);
        if (!handler) {
            handler = new Handler_1.Handler();
            this.handler.set(event, handler);
        }
        handler.afegirEsdeveniment(command);
    }
}
exports.Bot = Bot;
