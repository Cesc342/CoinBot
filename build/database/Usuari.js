"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Usuari {
    constructor({ id, diners, banc }) {
        this.diners = 0;
        this.banc = 0;
        this.treuBanc = 0.1;
        this.id = id;
        //Ho he fet aixi perque el valor diners no dongui negatiu
        this.sumarDiners(diners + banc);
        this.ficarBanc(banc);
    }
    //Es boolean perque comprova si s'ha pogut treure el diners o no
    //(De moment no vull donar la possibilitat de bancarrota)
    restarDiners(diners) {
        const dinersAbans = this.diners;
        const dinersDespres = dinersAbans - diners;
        if (dinersDespres >= 0) {
            this.diners = dinersDespres;
            return true;
        }
        else {
            return false;
        }
    }
    sumarDiners(diners) {
        this.diners += diners;
    }
    ficarBanc(diners) {
        if (this.restarDiners(diners)) {
            this.banc += diners;
            return true;
        }
        else {
            return false;
        }
    }
    treuraBanc(diners) {
        if (diners <= this.banc) {
            this.banc -= diners;
            this.sumarDiners(diners);
            return true;
        }
        return false;
    }
}
exports.Usuari = Usuari;
