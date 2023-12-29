import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StationDto } from '../station-dto.model';
import { DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-station-item',
  standalone: true,
  imports: [UpperCasePipe, DatePipe],
  templateUrl: './station-item.component.html',
  styleUrl: './station-item.component.scss',
})
export class StationItemComponent implements OnInit {
  public stationItem: StationDto | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<StationItemComponent>
  ) {}

  ngOnInit(): void {
    this.stationItem = this.data;
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
