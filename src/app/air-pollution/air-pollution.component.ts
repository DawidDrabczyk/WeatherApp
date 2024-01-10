import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-air-pollution',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './air-pollution.component.html',
  styleUrl: './air-pollution.component.scss',
})
export class AirPollutionComponent implements OnInit {
  public cityName?: string;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getCityByCoordinate('knurow', 1).subscribe((res) => {
      console.log(res);
    });
  }

  public getAirPollutionByCityName(city: any): void {
    this.weatherService.getCityByCoordinate(city, 1).subscribe((res) => {
      console.log(res);

      this.weatherService.getAirPollution(res.lat, res.lon).subscribe(res => {
        console.log(res);
      })
    });
  }
}
