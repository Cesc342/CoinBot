"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Personatge_1 = require("./Personatge");
class Pobla extends Personatge_1.Personatge {
    constructor(usuari, warewolf) {
        super(usuari, "pobla", warewolf);
        this.rol = "pobla";
        this.puntsForts = "``Forma part dels que decideixen matar al llop i poden ser reviscuts per la bruixa.``";
        this.puntsFebles = "``Els pot matar el llop i poden ser eliminats durant la ronda d'eliminacions.``";
        this.urlImatge = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-Ekc1pOMl9_0%2FVy7l06V7V4I%2FAAAAAAAALgg%2F7LG7AO-6goQ6SU--XAMP_d_aXxnDORTdgCLcB%2Fs1600%2F112%252Bcenicero%252B%252B10.jpg&f=1&nofb=1";
    }
}
exports.Pobla = Pobla;
