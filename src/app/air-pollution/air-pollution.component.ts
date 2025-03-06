import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { FormsModule } from '@angular/forms';
import { CityItemDto } from '../models/city-item-dto.models';
import { NgClass, NgIf, UpperCasePipe } from '@angular/common';
import { catchError, finalize, map, throwError } from 'rxjs';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { AirPollutionInfo } from '../models/air-pollution-dto.model';

@Component({
  selector: 'app-air-pollution',
  imports: [FormsModule, NgIf, UpperCasePipe, SpinnerComponent, NgClass],
  standalone: true,
  templateUrl: './air-pollution.component.html',
  styleUrl: './air-pollution.component.scss',
  providers: [WeatherService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AirPollutionComponent implements OnInit {
  public isSpinner: boolean = false;

  public errorMessage?: string | null;
  public cityName?: string;

  public lat?: number;
  public lon?: number;

  public cityItem?: CityItemDto | null;
  public airPollutionData?: AirPollutionInfo;

  @ViewChild('input_data') inputData!: ElementRef;

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly weatherService = inject(WeatherService);

  ngOnInit(): void {
    setTimeout(() => {
      this.setInputFocus();
    }, 200);

    let cityForWeatherItem = localStorage.getItem('city');

    if (cityForWeatherItem) {
      this.cityName = cityForWeatherItem;
      this.getCityByCoordinate(this.cityName);
    }
  }

  public getCityByCoordinate(city: string): void {
    this.isSpinner = true;

    this.weatherService
      .getCityByCoordinate(city, 1)
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
        if (res[0]) {
          this.lat = res[0].lat;
          this.lon = res[0].lon;
          this.cityItem = res[0];
          this.errorMessage = null;

          if (this.lat !== undefined && this.lon !== undefined) {
            this.getAirPollution(this.lat, this.lon);
          }
        } else {
          this.cityItem = null;
          this.errorMessage = `Nie znaleziono miejscowości ${this.cityName}!`;
        }

        setTimeout(() => {
          this.setInputFocus();
        }, 200);
      });
  }

  private getAirPollution(lat: number, lon: number): void {
    this.isSpinner = true;

    this.weatherService
      .getAirPollution(lat, lon)
      .pipe(
        map((res) => {
          const components = res.list[0].components;
          return components;
        }),
        finalize(() => {
          this.isSpinner = false;
          this.cdr.markForCheck();
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        this.airPollutionData = res;
      });
  }

  private setInputFocus(): void {
    this.inputData.nativeElement.focus();
  }

  private unsetInputFocus(): void {
    this.inputData.nativeElement.blur();
  }
}
