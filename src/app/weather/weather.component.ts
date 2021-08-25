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

  weather: Subscription;

  constructor(private weatherApiService: WeatherApiService) { }

  ngOnInit(): void {
  }

  getWeather() {
    this.weatherApiService.getWeather('Amsterdam').subscribe(response => console.log(response));
  }

}
