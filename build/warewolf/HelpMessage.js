"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Llistes_1 = require("../database/Llistes");
class HelpMessage {
    constructor() {
        this.llistaRols = new Llistes_1.Llistes();
        this.cargarLlista();
    }
    cargarLlista() {
        this.llistaRols.set("llop", {
            puntsForts: "``Tria qui viu i qui mor durant el joc. Es desperta abans que la resta de jugadors.``",
            puntsFebles: "``Tothom vota per a eliminar a un usuari que creuen que és el llop, osigui que haureu d'anar amb cura de ser silenciosos``",
            comandos: "``bot!ww [usuari a qui vols matar]``",
            urlImatge: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.oSem4zM0NqC9nTIJezJAeAHaF_%26pid%3DApi&f=1"
        });
        this.llistaRols.set("bruixa", {
            puntsForts: "``Pot reviure a una persona o prendre la vida d'una altre si sospita que és el llop.``",
            puntsFebles: "``Només té dos pocions durant tota la partida i quan se li gasten passa a ser part del poble``",
            comandos: "``bot!ww matar [usuari qui vols matar], bot!ww reviure [usuari qui vols reviure]``",
            urlImatge: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FRihvg4GvKqU%2Fmaxresdefault.jpg&f=1&nofb=1"
        });
        this.llistaRols.set("cupido", {
            puntsForts: "``Pot enamorar a dos usuaris fent que el que li passi a un li passa també a l'altre.``",
            puntsFebles: "``Només ho pot fer un cop per partida i després es converteix en un usuari del poble.``",
            comandos: "``bot!ww [usuari enamorat] [usuari enamorat]``",
            urlImatge: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F47%2Fc4%2F7a%2F47c47af85bd55a5b31e1cec06fa33f5d.jpg&f=1&nofb=1"
        });
        this.llistaRols.set("pobla", {
            puntsForts: "``Forma part dels que decideixen matar al llop i poden ser reviscuts per la bruixa.``",
            puntsFebles: "``Els pot matar el llop i poden ser eliminats durant la ronda d'eliminacions.``",
            comandos: "``No en té``",
            urlImatge: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-Ekc1pOMl9_0%2FVy7l06V7V4I%2FAAAAAAAALgg%2F7LG7AO-6goQ6SU--XAMP_d_aXxnDORTdgCLcB%2Fs1600%2F112%252Bcenicero%252B%252B10.jpg&f=1&nofb=1"
        });
    }
    help(rol) {
        let infoPersonatge = this.llistaRols.get(rol);
        if (infoPersonatge) {
            let msg = new discord_js_1.MessageEmbed({ title: `Descripcio de ${rol}`, description: "\~\~\~\~\~\~", color: "#ff0000" });
            msg.addField("Punts forts: ", infoPersonatge.puntsForts);
            msg.addField("Punts febles: ", infoPersonatge.puntsFebles);
            msg.addField("Comandos: ", infoPersonatge.comandos);
            msg.setThumbnail(infoPersonatge.urlImatge);
            return msg;
        }
    }
}
exports.HelpMessage = HelpMessage;
