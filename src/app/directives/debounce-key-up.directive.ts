import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Directive({
  selector: '[appDebounceKeyUp]',
  standalone: true,
})
export class DebounceKeyUpDirective implements OnInit, OnDestroy {
  @Output() debounceKeyUp = new EventEmitter();
  @Input() time = 300;
  private keyupEvent = new Subject();
  private subscription: Subscription = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.subscription = this.keyupEvent
      .pipe(debounceTime(this.time))
      .subscribe((e) => this.debounceKeyUp.emit(e));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
