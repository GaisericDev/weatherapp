import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Weather, WeatherAdapter } from '../models/weather.model';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  url = 'http://api.openweathermap.org/data/2.5/weather?q=';
  key = '&appid=9d1dce11fbf3e590dbb87df77dca4de6';
  constructor(private http: HttpClient, private adapter: WeatherAdapter) { }

  //get weather based on location
  getWeather(location: string): Observable<any> {
    // return this.http.get<Weather[]>(`${this.url}${location}${this.key}`).pipe(
    //   map((data: any[]) => data.map((item) => this.adapter.adapt(item)))
    // );
    return this.http.get(`${this.url}${location}${this.key}`);
  }
}
