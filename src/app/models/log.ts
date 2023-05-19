import { Timestamp } from "firebase/firestore";
import { logEventType } from "./enums/logEventType";

export class Log {
    constructor(public id:string,
    public entity:string,
    public eventType:logEventType,
    public content:string,
    public date:Timestamp
    ){}

}
