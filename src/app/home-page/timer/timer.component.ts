import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, map, timer } from 'rxjs';

@Component({
    selector: 'app-timer',
    imports: [AsyncPipe, DatePipe],
    standalone: true,
    templateUrl: './timer.component.html',
    styleUrl: './timer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {
  public time!: Observable<Date>;

  ngOnInit(): void {
    this.time = timer(0, 1000).pipe(map(() => new Date()));
  }
}
