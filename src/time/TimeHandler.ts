export interface TimeEvent{
    hour: number;
    minute?: number;
    activat: () => boolean;
}

let hola: TimeEvent = {
    hour: 10,
    activat: () => {
        return false;
    }
}

export class TimeHandler {
    private hourPassat: number = 0;
    private date: Date = new Date();

    private intervalNum: any;
    private eventMinList: TimeEvent[] = [];
    private eventHourList: TimeEvent[] = [];

    constructor()
    {
        this.start();
    }

    public addTimeEvent(tEv: TimeEvent): number
    {
        let num: number = 0;
        if(tEv.minute) {
            this.eventMinList.push( tEv );
            num = this.eventMinList.length - 1;
        } else {
            this.eventHourList.push( tEv );
            num = this.eventHourList.length - 1;
        }
        return num;
    }

    //Comprova cada evento
    public comprovar(): void
    {
        this.date = new Date();
        let min: number = this.date.getMinutes();
        let hour: number = this.date.getHours();

        //Comprova els eventos de minuts
        let arrComprov: boolean[] = [];
        let borrat = false;
        for(let ev of this.eventMinList)
        {
            if(ev.hour == hour) {
                if(ev.minute == min) {
                    let b = ev.activat();
                    arrComprov.push(b);
                    borrat = borrat || b;
                }
            }
        }

        if (borrat) {
            this.eventMinList = this.eventMinList.filter((value, index, array) => {
                return !arrComprov[index];
            })
        }

        if(hour != this.hourPassat) {
            //Comprova els eventos de hores
            let arrComprov: boolean[] = [];
            let borrat = false;
            for(let ev of this.eventHourList)
            {
                if(ev.hour == hour) {
                    let b = ev.activat();
                    arrComprov.push(b);
                    borrat = borrat || b;
                }
            }

            if (borrat) { //Borra els que ja s'han fet
                this.eventHourList = this.eventHourList.filter((value, index, array) => {
                    return !arrComprov[index];
                })
            }
            this.hourPassat = hour;
        }
        console.table(this.eventMinList)
    }

    public stop(): void
    {
        clearInterval(this.intervalNum);
    }
    public start(): void
    {
        this.date = new Date();
        let milEquilibracio = (60 - this.date.getSeconds()) * 1000;

        setTimeout( () => {
                console.log(`Interval de TimeHandler Activat`);
                this.comprovar();

                this.intervalNum = setInterval(() => {
                    this.comprovar();
                }, 60000);
        }, //Funcio per tick
            milEquilibracio
        );

        console.log(`Temps espera: ${milEquilibracio / 1000} segons`);
    }
}