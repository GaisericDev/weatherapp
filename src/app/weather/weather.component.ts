import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Weather } from '../models/weather.model';
import { WeatherApiService } from '../services/weather-api.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.sass']
})
export class WeatherComponent implements OnInit {

  weather: Weather;

  constructor(private weatherApiService: WeatherApiService) { }

  ngOnInit(): void {
  }

  getWeather() {
    this.weatherApiService.getWeather('Amsterdam').subscribe(
      res => {
        this.weather = new Weather();
        this.weather.desc = res.weather[0].description;
        this.weather.humidity = res.main.humidity;
        this.weather.pressure = res.main.pressure;
        this.weather.temp = res.main.temp;
        this.weather.windSpeed = res.wind.speed;
        this.weather.direction = res.wind.deg;
      }
    )
  }

}
