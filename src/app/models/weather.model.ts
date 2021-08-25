import { Adapter } from "../interfaces/adapter";
import { Injectable } from "@angular/core";

export class Weather {
    constructor(public item: any) { }
}

@Injectable({
    providedIn: "root",
})
export class WeatherAdapter implements Adapter<Weather> {
    adapt(item: any): Weather {
        return new Weather(item);
    }
}