import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../weather.service';
import { FormsModule } from '@angular/forms';
import { CityItemDto } from '../models/city-item-dto.models';
import { NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { catchError, finalize, map, throwError } from 'rxjs';
import { SpinnerComponent } from '../spinner/spinner.component';
import { AirPollutionInfo } from '../models/air-pollution-dto.model';

@Component({
  selector: 'app-air-pollution',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, UpperCasePipe, SpinnerComponent, NgClass],
  templateUrl: './air-pollution.component.html',
  styleUrl: './air-pollution.component.scss',
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

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.setInputFocus();
    }, 200);
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
