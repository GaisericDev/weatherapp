import { Component, OnInit } from '@angular/core';
import { Weather } from '../models/weather.model';
import { WeatherApiService } from '../services/weather-api.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.sass']
})
export class WeatherComponent implements OnInit {

  weather: Weather;
  location: string = '';
  isDarkMode: boolean;
  constructor(
    private weatherApiService: WeatherApiService,
    private themeService: ThemeService
  ) {
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }

  ngOnInit(): void {
  }

  //gets the weather for given location
  getWeather() {
    this.weatherApiService.getWeather(this.location).subscribe(
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

  toggleDarkMode() {
    this.isDarkMode = this.themeService.isDarkMode();
    this.isDarkMode ? this.themeService.update('lightMode') : this.themeService.update('darkMode');
  }
}
