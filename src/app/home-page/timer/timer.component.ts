import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, map, timer } from 'rxjs';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent implements OnInit {
  public time!: Observable<Date>;

  ngOnInit(): void {
    this.time = timer(0, 1000).pipe(map(() => new Date()));
  }
}
