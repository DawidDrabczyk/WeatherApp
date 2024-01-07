import {
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WeatherService } from '../weather.service';
import { catchError, finalize, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { WeatherItemDto } from '../models/weather-item-dto.model';
import { SpinnerComponent } from '../spinner/spinner.component';
import {
  DatePipe,
  DecimalPipe,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  UpperCasePipe,
} from '@angular/common';
import tippy from 'tippy.js';
import { NavigationExtras, Router } from '@angular/router';

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
    DecimalPipe,
  ],
  templateUrl: './weather-item.component.html',
  styleUrl: './weather-item.component.scss',
})
export class WeatherItemComponent implements OnInit, DoCheck {
  public isSpinner: boolean = false;
  public isFavourite: boolean = false;

  public weatherItem?: WeatherItemDto | null;

  public cityName?: string;
  public errorMessage?: string | null;
  public weatherIcon?: string;
  public units?: string;

  @ViewChild('input_data') inputData!: ElementRef;

  constructor(private weatherService: WeatherService, private router: Router) {}

  ngOnInit(): void {
    this.units = 'metric';
    setTimeout(() => {
      this.setInputFocus();
    }, 200);
  }

  ngDoCheck(): void {
    tippy('#favIcon', {
      content: 'Dodano do ulubionych',
    });
  }

  public getWeatherByCityName(city: any, units: any): void {
    this.isSpinner = true;

    this.weatherService
      .getWeatherByCityName(city, units)
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
        this.weatherItem = res;
        this.markAsFavourite();
        this.weatherIcon = this.setWeatherIcon(
          this.weatherItem.weather[0].main
        );
        this.errorMessage = null;
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight);
        }, 500);
      });
  }

  public clearData(): void {
    this.setInputFocus();
    this.weatherItem = null;
  }

  public addToFavourite(weatherItem: WeatherItemDto): void {
    if (!this.weatherService.favouriteItems.includes(weatherItem)) {
      this.weatherService.favouriteItems.push(weatherItem);
      weatherItem.isFavourite = true;
      window.scrollTo(0, 0);
      this.setInputFocus();
    }

    this.weatherService.favouritePlacesArray.next(
      this.weatherService.favouriteItems
    );
  }

  public removeFromFavourite(weatherItem: WeatherItemDto): void {
    const index = this.weatherService.favouriteItems.findIndex(
      (item) => item.id === weatherItem.id
    );

    if (index !== -1) {
      this.weatherService.favouriteItems.splice(index, 1);
      weatherItem.isFavourite = false;
      window.scrollTo(0, 0);

      this.weatherService.favouritePlacesArray.next(
        this.weatherService.favouriteItems
      );
    }
  }

  public checkWeatherForecast(weatherItem: WeatherItemDto): void {
    localStorage.setItem('city', weatherItem.name);

    this.router.navigate(['/weather-forecast']);
  }

  private setInputFocus(): void {
    this.inputData.nativeElement.focus();
  }

  private unsetInputFocus(): void {
    this.inputData.nativeElement.blur();
  }

  private markAsFavourite(): void {
    if (
      this.weatherItem &&
      this.weatherService.favouriteItems.some(
        (item) => item.id === this.weatherItem?.id
      )
    ) {
      this.weatherItem.isFavourite = true;
    }
  }

  private setWeatherIcon(weatherDesc: string): string {
    switch (weatherDesc) {
      case 'Rain':
        return '../../assets/img/weather-icons/rain.png';
        break;
      case 'Snow':
        return '../../assets/img/weather-icons/snow.jpg';
        break;
      case 'Thunderstorm':
        return '../../assets/img/weather-icons/thunderstorm.png';
        break;
      case 'Clear':
        return '../../assets/img/weather-icons/sun.png';
        break;
      case 'Clouds':
        return '../../assets/img/weather-icons/cloud.png';
        break;
      case 'Drizzle':
        return '../../assets/img/weather-icons/drizzle.png';
        break;
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
        break;
      default:
        return '../../assets/img/weather-icons/unknown.png';
    }
  }
}
