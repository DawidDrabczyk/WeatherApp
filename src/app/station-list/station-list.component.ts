import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StationDto } from '../models/station-dto.model';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { catchError, finalize, throwError } from 'rxjs';
import { StationItemComponent } from './station-item/station-item.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StationService } from './station.service';

@Component({
    selector: 'app-station-list',
    imports: [SpinnerComponent, NgClass, FormsModule],
    standalone: true,
    templateUrl: './station-list.component.html',
    styleUrl: './station-list.component.scss',
    providers: [HttpClient],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StationListComponent implements OnInit {
  public stationList: Array<StationDto> = [];
  public filteredList: Array<StationDto> = [];

  public isSpinner: boolean = false;
  public showBackdrop: boolean = false;
  public searchPhrase: string | undefined;

  public dialogRef: MatDialogRef<StationItemComponent> | undefined;

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly stationService = inject(StationService);
  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getStationList();
  }

  public getStationById(stationId: string): void {
    this.showBackdrop = true;

    this.stationService
      .getStationById(stationId)
      .pipe(
        finalize(() => {
          this.isSpinner = false;
          this.cdr.markForCheck();
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
          this.cdr.markForCheck();
        });
      });
  }

  public searchStationByName(event: any): void {
    const filteredStation = event.target.value;
    this.stationList = this.filteredList.filter((station) =>
      station.stacja.toLowerCase().includes(filteredStation.toLowerCase())
    );
  }

  public clearSearcher(): void {
    this.searchPhrase = '';
    this.getStationList();
  }

  private getStationList(): void {
    this.isSpinner = true;

    this.stationService
      .getStationList()
      .pipe(
        finalize(() => {
          this.isSpinner = false;
          this.cdr.markForCheck();
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
