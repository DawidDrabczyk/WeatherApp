import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { HttpClient } from '@angular/common/http';
import { StationDto } from './station-dto.model';
import { SpinnerComponent } from '../spinner/spinner.component';
import { catchError, finalize, throwError } from 'rxjs';
import { StationItemComponent } from './station-item/station-item.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-station-list',
  standalone: true,
  imports: [SpinnerComponent, NgClass],
  templateUrl: './station-list.component.html',
  styleUrl: './station-list.component.scss',
  providers: [HttpClient],
})
export class StationListComponent implements OnInit {
  public stationList: Array<StationDto> = [];
  public filteredList: Array<StationDto> = [];
  public isSpinner: boolean = false;
  public showBackdrop: boolean = false;
  public dialogRef: MatDialogRef<StationItemComponent> | undefined;
  public itemsPerPage = 5;
  public currentPage = 1;

  constructor(
    private weatherService: WeatherService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getStationList();
  }

  public getStationById(stationId: string): void {
    this.showBackdrop = true;

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
        const data = res;

        this.dialogRef = this.dialog.open(StationItemComponent, {
          width: '80vw',
          minHeight: '50vh',
          data,
        });

        this.dialogRef.afterClosed().subscribe((res) => {
          this.showBackdrop = false;
        });
      });
  }

  public searchStationByName(event: any): void {
    const filteredStation = event.target.value;
    this.stationList = this.filteredList.filter((station) =>
      station.stacja.toLowerCase().includes(filteredStation.toLowerCase())
    );
  }

  public pageChanged(event: any): void {
    this.currentPage = event.page;
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
