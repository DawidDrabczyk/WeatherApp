import {
  NgIf,
  NgFor,
  UpperCasePipe,
  DatePipe,
  NgSwitch,
  NgSwitchCase,
  DecimalPipe,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize, catchError, throwError } from 'rxjs';
import { WeatherForecastItemDto } from '../../models/weather-forecast-item-dto.model';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-forecast',
  imports: [
    SpinnerComponent,
    NgIf,
    NgFor,
    FormsModule,
    UpperCasePipe,
    DatePipe,
    NgSwitch,
    NgSwitchCase,
    DecimalPipe,
  ],
  standalone: true,
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.scss',
  providers: [WeatherService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherForecast implements OnInit, OnDestroy {
  public isSpinner: boolean = false;
  public isFavourite: boolean = false;

  public weatherForecastItem?: WeatherForecastItemDto | null;

  public cityName?: string;
  public errorMessage?: string | null;
  public weatherIcon?: string;
  public units?: string;

  public averageTemp?: number;
  public weatherForecastMode?: any;

  @ViewChild('input_data') inputData!: ElementRef;

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly weatherService = inject(WeatherService);

  ngOnInit(): void {
    this.units = 'metric';
    setTimeout(() => {
      this.setInputFocus();
    }, 200);

    let cityForWeatherItem = localStorage.getItem('city');

    if (cityForWeatherItem) {
      this.cityName = cityForWeatherItem;
      this.getWeatherForecastByCityName(this.cityName, this.units);
    }
  }

  ngOnDestroy(): void {
    localStorage.clear();
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
          localStorage.clear();
          this.cdr.markForCheck();
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

  public setWeatherIcon(weatherDesc: string): string {
    switch (weatherDesc) {
      case 'Rain':
        return '../../assets/img/weather-icons/rain.png';
      case 'Snow':
        return '../../assets/img/weather-icons/snow.jpg';
      case 'Thunderstorm':
        return '../../assets/img/weather-icons/thunderstorm.png';
      case 'Clear':
        return '../../assets/img/weather-icons/sun.png';
      case 'Clouds':
        return '../../assets/img/weather-icons/cloud.png';
      case 'Drizzle':
        return '../../assets/img/weather-icons/drizzle.png';
      case 'Mist':
      case 'Smoke':
      case 'Haze':
      case 'Dust':
      case 'Sand':
      case 'Ash':
      case 'Squall':
      case 'Tornado':
      case 'Fog':
        return '../../assets/img/weather-icons/fog.png';
      default:
        return '../../assets/img/weather-icons/unknown.png';
    }
  }

  private setInputFocus(): void {
    this.inputData.nativeElement.focus();
  }

  private unsetInputFocus(): void {
    this.inputData.nativeElement.blur();
  }
}
