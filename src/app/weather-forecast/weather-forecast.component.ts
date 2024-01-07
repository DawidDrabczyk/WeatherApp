import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../weather.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import {
  DatePipe,
  NgFor,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  UpperCasePipe,
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize, catchError, throwError } from 'rxjs';
import { WeatherForecastItemDto } from '../models/weather-forecast-item-dto.model';

@Component({
  selector: 'app-weather-forecast',
  standalone: true,
  imports: [
    SpinnerComponent,
    NgIf,
    NgFor,
    FormsModule,
    UpperCasePipe,
    DatePipe,
    NgSwitch,
    NgSwitchCase,
  ],
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.scss',
})
export class WeatherForecastComponent implements OnInit {
  public isSpinner: boolean = false;
  public isFavourite: boolean = false;

  public weatherForecastItem?: WeatherForecastItemDto | null;

  public cityName?: string;
  public errorMessage?: string | null;
  public weatherIcon?: string;
  public units?: string;

  @ViewChild('input_data') inputData!: ElementRef;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.units = 'metric';
    setTimeout(() => {
      this.setInputFocus();
    }, 200);
  }

  public getWeatherForecastByCityName(city: any, units: any): void {
    this.isSpinner = true;

    this.weatherService
      .getWeatherForecastByCityName(city, units)
      .pipe(
        finalize(() => {
          this.isSpinner = false;
          this.cityName = '';
          if (window.innerWidth < 1200) {
            this.unsetInputFocus();
          }
        }),
        catchError((err) => {
          this.errorMessage = `Nie znaleziono miejscowości ${this.cityName}!`;
          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        this.weatherForecastItem = res;
        this.errorMessage = null;
      });
  }

  public clearData(): void {
    this.setInputFocus();
    this.weatherForecastItem = null;
  }

  private setInputFocus(): void {
    this.inputData.nativeElement.focus();
  }

  private unsetInputFocus(): void {
    this.inputData.nativeElement.blur();
  }
}
