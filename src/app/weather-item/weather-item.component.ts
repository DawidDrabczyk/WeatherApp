import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../weather.service';
import { catchError, finalize, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { WeatherItemDto } from '../models/weather-item-dto.model';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-weather-item',
  standalone: true,
  imports: [FormsModule, SpinnerComponent, NgIf],
  templateUrl: './weather-item.component.html',
  styleUrl: './weather-item.component.scss',
})
export class WeatherItemComponent implements OnInit {
  public isSpinner: boolean = false;
  public cityName!: string;
  public weatherItem!: WeatherItemDto;
  public errorMessage!: string;

  @ViewChild('input_data') inputData!: ElementRef;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.setInputFocus();
    }, 200);
  }

  public getWeatherByCityName(city: string): void {
    this.isSpinner = true;

    this.weatherService
      .getWeatherByCityName(city)
      .pipe(
        finalize(() => {
          this.isSpinner = false;
          this.cityName = '';
          this.setInputFocus();
        }),
        catchError((err) => {
          this.errorMessage = `Nie znaleziono miejscowości ${this.cityName}!`
          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        this.weatherItem = res;
        console.log(this.weatherItem);
      });
  }

  private setInputFocus(): void {
    this.inputData.nativeElement.focus();
  }
}
