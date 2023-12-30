import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StationDto } from '../station-dto.model';
import { DatePipe, NgStyle, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-station-item',
  standalone: true,
  imports: [UpperCasePipe, DatePipe, NgStyle],
  templateUrl: './station-item.component.html',
  styleUrl: './station-item.component.scss',
})
export class StationItemComponent implements OnInit {
  public stationItem: StationDto | undefined;
  public temperature?: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<StationItemComponent>
  ) {}

  ngOnInit(): void {
    this.stationItem = this.data;
    if (this.stationItem && this.stationItem.temperatura) {
      this.temperature = this.setTemperatureNumberType();
    }

    console.log(this.temperature);
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public getBackgroundColor(): string | null {
    if (this.temperature) {
      if (this.temperature <= 0) {
        return '#729ABB';
      } else if (this.temperature > 0 && this.temperature <= 13) {
        return '#9BBAD3';
      } else if (this.temperature > 13 && this.temperature <= 25) {
        return '#F3D589';
      } else if (this.temperature > 25) {
        return '#FF8585';
      }
    }
    return 'transparent';
  }

  private setTemperatureNumberType(): number {
    return this.stationItem && this.stationItem.temperatura
      ? +this.stationItem.temperatura
      : 0;
  }
}
