import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { HttpClient } from '@angular/common/http';
import { StationDto } from './station-dto.model';
import { SpinnerComponent } from '../spinner/spinner.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-station-list',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './station-list.component.html',
  styleUrl: './station-list.component.scss',
  providers: [HttpClient],
})
export class StationListComponent implements OnInit {
  public stationList: Array<StationDto> = [];
  public isSpinner: boolean = false;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getStationList();
  }

  private getStationList(): void {
    this.isSpinner = true;
    this.weatherService
      .getStationList()
      .pipe(
        finalize(() => {
          this.isSpinner = false;
        })
      )
      .subscribe((res) => {
        console.log(res);
        this.stationList = res;
      });
  }
}
