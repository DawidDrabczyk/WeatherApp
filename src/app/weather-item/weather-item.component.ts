import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../weather.service';
import { catchError, finalize, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { WeatherItemDto } from '../models/weather-item-dto.model';
import { SpinnerComponent } from '../spinner/spinner.component';
import {
  DatePipe,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  UpperCasePipe,
} from '@angular/common';

@Component({
  selector: 'app-weather-item',
  standalone: true,
  imports: [
    FormsModule,
    SpinnerComponent,
    NgIf,
    UpperCasePipe,
    NgSwitch,
    NgSwitchCase,
    DatePipe,
  ],
  templateUrl: './weather-item.component.html',
  styleUrl: './weather-item.component.scss',
})
export class WeatherItemComponent implements OnInit {
  public isSpinner: boolean = false;
  public cityName!: string;
  public weatherItem!: WeatherItemDto | null;
  public errorMessage!: string | null;
  public weatherIcon!: string;
  public units!: string;

  @ViewChild('input_data') inputData!: ElementRef;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.units = 'metric';
    setTimeout(() => {
      this.setInputFocus();
    }, 200);
  }

  public getWeatherByCityName(city: string, units: string): void {
    this.isSpinner = true;

    this.weatherService
      .getWeatherByCityName(city, units)
      .pipe(
        finalize(() => {
          this.isSpinner = false;
          this.cityName = '';
          console.log(window.innerWidth);
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
        this.weatherItem = res;
        this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherItem.weather[0].icon}@2x.png`;
        this.errorMessage = null;
        console.log(this.weatherItem);
      });
  }

  public clearData(): void {
    this.setInputFocus();
    this.weatherItem = null;
  }

  private setInputFocus(): void {
    this.inputData.nativeElement.focus();
  }

  private unsetInputFocus(): void {
    this.inputData.nativeElement.blur();
  }
}
