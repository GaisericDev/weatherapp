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
  mode: string;
  directionTxt: string = '';
  constructor(
    private weatherApiService: WeatherApiService,
    private themeService: ThemeService
  ) {
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
    this.isDarkMode ? this.mode = 'dark' : this.mode = 'light';
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
        //format date
        this.weather.date = new Date();
        this.date = (this.weather.date.toLocaleString('en-us', {
          weekday: 'long',
          month: 'long',
          year: 'numeric',
          day: 'numeric',
        }));
        //turn degrees into wind directions
        this.directionTxt = this.degToDirections(this.weather.direction);
        //get weather icon
        this.weather.icon = res.weather[0].icon;
      }
    )
  }

  //turns degrees to cardinal directions
  degToDirections(deg: number) {
    let val = Math.floor((deg / 22.5) + 0.5);
    let arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
  }
  //toggles dark mode / light mode using service
  toggleDarkMode() {
    this.isDarkMode = this.themeService.isDarkMode();
    this.isDarkMode ? this.themeService.update('lightMode') : this.themeService.update('darkMode');
  }
}
