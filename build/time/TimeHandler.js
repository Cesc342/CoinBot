"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let hola = {
    hour: 10,
    activat: () => {
        return false;
    }
};
class TimeHandler {
    constructor() {
        this.hourPassat = 0;
        this.date = new Date();
        this.eventMinList = [];
        this.eventHourList = [];
        this.start();
    }
    addTimeEvent(tEv) {
        let num = 0;
        if (tEv.minute) {
            this.eventMinList.push(tEv);
            num = this.eventMinList.length - 1;
        }
        else {
            this.eventHourList.push(tEv);
            num = this.eventHourList.length - 1;
        }
        return num;
    }
    //Comprova cada evento
    comprovar() {
        this.date = new Date();
        let min = this.date.getMinutes();
        let hour = this.date.getHours();
        //Comprova els eventos de minuts
        let arrComprov = [];
        let borrat = false;
        for (let ev of this.eventMinList) {
            if (ev.hour == hour) {
                if (ev.minute == min) {
                    let b = ev.activat();
                    arrComprov.push(b);
                    borrat = borrat || b;
                }
            }
        }
        if (borrat) {
            this.eventMinList = this.eventMinList.filter((value, index, array) => {
                return !arrComprov[index];
            });
        }
        if (hour != this.hourPassat) {
            //Comprova els eventos de hores
            let arrComprov = [];
            let borrat = false;
            for (let ev of this.eventHourList) {
                if (ev.hour == hour) {
                    let b = ev.activat();
                    arrComprov.push(b);
                    borrat = borrat || b;
                }
            }
            if (borrat) { //Borra els que ja s'han fet
                this.eventHourList = this.eventHourList.filter((value, index, array) => {
                    return !arrComprov[index];
                });
            }
            this.hourPassat = hour;
        }
        console.table(this.eventMinList);
    }
    stop() {
        clearInterval(this.intervalNum);
    }
    start() {
        this.date = new Date();
        let milEquilibracio = (60 - this.date.getSeconds()) * 1000;
        setTimeout(() => {
            console.log(`Interval de TimeHandler Activat`);
            this.comprovar();
            this.intervalNum = setInterval(() => {
                this.comprovar();
            }, 60000);
        }, //Funcio per tick
        milEquilibracio);
        console.log(`Temps espera: ${milEquilibracio / 1000} segons`);
    }
}
exports.TimeHandler = TimeHandler;
