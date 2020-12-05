import {TimeEvent, TimeHandler} from "./time/TimeHandler";

let t = new TimeHandler();
t.addTimeEvent({
    hour: 12,
    minute: 25,
    activat: () => { console.log("HOLAAAAAAAAAAAAAAAAAAAAaa"); return true }
})
t.addTimeEvent({
    hour: 12,
    minute: 25,
    activat: () => { console.log("AAAADEUUU"); return true }
})
t.addTimeEvent({
    hour: 12,
    minute: 26,
    activat: () => { console.log("XDDDDDDDD"); return true }
})