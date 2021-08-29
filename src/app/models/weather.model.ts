export class Weather {
    constructor
        () { }
    public name: string;
    public desc: string;
    public windSpeed: number;
    public temp: number;
    public humidity: number;
    public pressure: number;
    public direction: number;
    public date: Date;
    public icon: string;
    public country: string;
    public error: boolean = false;
}