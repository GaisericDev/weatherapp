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
  location: string = 'Amsterdam';
  date: string;
  isDarkMode: boolean;

  constructor(
    private weatherApiService: WeatherApiService,
    private themeService: ThemeService
  ) {
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }

  ngOnInit(): void {
    this.getWeather();
  }

  //gets the weather for given location
  getWeather() {
    this.weatherApiService.getWeather(this.location).subscribe(
      res => {
        this.weather = new Weather();
        this.weather.desc = res.weather[0].description;
        this.weather.humidity = parseInt(res.main.humidity.toFixed(0));
        this.weather.pressure = parseInt(res.main.pressure);
        this.weather.temp = parseInt((res.main.temp - 272.15).toFixed(2));
        this.weather.windSpeed = parseInt((res.wind.speed * 3.6).toFixed(0));
        this.weather.direction = parseInt(res.wind.deg);
        this.weather.date = new Date();
        this.date = (this.weather.date.toLocaleString('en-us', {
          weekday: 'long',
          month: 'long',
          year: 'numeric',
          day: 'numeric',
        }));
      }
    )
  }
  //toggles dark mode / light mode using service
  toggleDarkMode() {
    this.isDarkMode = this.themeService.isDarkMode();
    this.isDarkMode ? this.themeService.update('lightMode') : this.themeService.update('darkMode');
  }
}
