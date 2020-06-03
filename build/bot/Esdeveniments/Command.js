"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(command, esdeveniment) {
        this.command = command;
        this.esdeveniment = esdeveniment;
    }
    async on(contingut, msg) {
        await this.esdeveniment(contingut, msg);
    }
}
exports.Command = Command;
