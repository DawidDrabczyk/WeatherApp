import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TimerComponent } from './timer/timer.component';

@Component({
    selector: 'app-home-page',
    imports: [RouterModule, TimerComponent],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss'
})
export class HomePageComponent {}
