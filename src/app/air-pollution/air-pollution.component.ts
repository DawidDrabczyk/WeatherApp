import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { FormsModule } from '@angular/forms';
import { CityItemDto } from '../models/city-item-dto.models';
import { NgClass, NgIf, UpperCasePipe } from '@angular/common';
import { catchError, finalize, map, throwError } from 'rxjs';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { AirPollutionInfo } from '../models/air-pollution-dto.model';
import { MessageStatus } from '../shared/enums/message-status.enum';
import { MessagesService } from '../shared/services/messages.service';

@Component({
  selector: 'app-air-pollution',
  imports: [FormsModule, NgIf, UpperCasePipe, SpinnerComponent, NgClass],
  standalone: true,
  templateUrl: './air-pollution.component.html',
  styleUrl: './air-pollution.component.scss',
  providers: [WeatherService],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  public messageStatus = MessageStatus;
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly weatherService = inject(WeatherService);
  private readonly messagesService = inject(MessagesService);

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
    this.handleSpinner(true);

    this.weatherService
      .getCityByCoordinate(city, 1)
      .pipe(
        finalize(() => {
          this.handleSpinner(false);
          this.cityName = '';
          if (window.innerWidth < 1200) {
            this.unsetInputFocus();
          }
          localStorage.clear();
        }),
        catchError((err) => {
          this.showErrorMsg(
            'Wystąpił błąd podczas pobierania informacji o miejscowości'
          );
          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        this.handleCityData(res[0]);

        setTimeout(() => {
          this.setInputFocus();
        }, 200);
      });
  }

  private handleCityData(city: CityItemDto): void {
    if (city) {
      this.lat = city.lat;
      this.lon = city.lon;
      this.cityItem = city;
      this.errorMessage = null;

      if (this.lat !== undefined && this.lon !== undefined) {
        this.getAirPollution(this.lat, this.lon);
      }
    } else {
      this.showErrorMsg(
        'Nie znaleziono podanej miejscowości - spróbuj ponownie'
      );
    }
  }

  private getAirPollution(lat: number, lon: number): void {
    this.handleSpinner(true);

    this.weatherService
      .getAirPollution(lat, lon)
      .pipe(
        map((res) => {
          const components = res.list[0].components;
          return components;
        }),
        finalize(() => this.handleSpinner(false)),
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

  private handleSpinner(isSpinner: boolean): void {
    this.isSpinner = isSpinner;
    this.cdr.markForCheck();
  }

  private showErrorMsg(message: string): void {
    this.cityItem = null;
    this.errorMessage = message;
    this.messagesService.showMessage(message, this.messageStatus.Error);
  }
}
