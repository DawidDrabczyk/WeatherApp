import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [HttpClient],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public readonly title = 'weather-app';
  private readonly authService = inject(AuthService)
  public loggedInApp!: boolean;

  ngOnInit(): void {
    this.loggedInApp = this.authService.loggedIn();
  }
}
