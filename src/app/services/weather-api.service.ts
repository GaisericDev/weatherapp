import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import apiKey from "../../../secret";
@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private url = 'http://api.openweathermap.org/data/2.5/weather?q=';
  private key = apiKey;
  constructor(private http: HttpClient) { }
  //get weather based on location
  getWeather(location: string): Observable<any> {
    return this.http.get(`${this.url}${location}${this.key}`);
  }
}
