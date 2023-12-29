import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { HttpClient } from '@angular/common/http';
import { StationDto } from './station-dto.model';
import { SpinnerComponent } from '../spinner/spinner.component';
import { catchError, finalize, throwError } from 'rxjs';
import { DebounceKeyUpDirective } from '../directives/debounce-key-up.directive';

@Component({
  selector: 'app-station-list',
  standalone: true,
  imports: [SpinnerComponent, DebounceKeyUpDirective],
  templateUrl: './station-list.component.html',
  styleUrl: './station-list.component.scss',
  providers: [HttpClient],
})
export class StationListComponent implements OnInit {
  public stationList: Array<StationDto> = [];
  public filteredList: Array<StationDto> = [];
  public isSpinner: boolean = false;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getStationList();
  }

  public getStationById(stationId: string): void {
    this.weatherService
      .getStationById(stationId)
      .pipe(
        finalize(() => {
          this.isSpinner = false;
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  public searchStationByName(event: any): void {
    const filteredStation = event.target.value;
    this.stationList = this.filteredList.filter((station) =>
      station.stacja.toLowerCase().includes(filteredStation.toLowerCase())
    );

    console.log(filteredStation);
  }

  private getStationList(): void {
    this.isSpinner = true;

    this.weatherService
      .getStationList()
      .pipe(
        finalize(() => {
          this.isSpinner = false;
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        this.stationList = res;
        this.filteredList = [...this.stationList];
      });
  }
}
