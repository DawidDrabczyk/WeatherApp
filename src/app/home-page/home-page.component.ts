import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TimerComponent } from './timer/timer.component';

@Component({
  selector: 'app-home-page',
  imports: [RouterModule, TimerComponent],
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  protected readonly login: string | null = sessionStorage.getItem('login');
}
