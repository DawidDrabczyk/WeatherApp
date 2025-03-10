import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherItemDto } from '../../models/weather-item-dto.model';
import { WeatherService } from '../../weather/weather.service';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import tippy from 'tippy.js';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, NgIf],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [WeatherService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  public loggedInApp!: boolean;
  public favouriteItems: Array<WeatherItemDto> = [];
  private subscription?: Subscription;
  private readonly authService = inject(AuthService);
  private readonly cdr = inject(ChangeDetectorRef);

  @ViewChild('navbarNav', { static: false }) navbarNav?: ElementRef;

  constructor(private weatherService: WeatherService) {
    effect(() => {
      this.loggedInApp = this.authService.loggedIn();
      this.cdr.markForCheck();
    });
  }

  ngOnInit(): void {
    this.getFavouriteList();

    this.startLoginListener();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngAfterViewInit() {
    tippy('#logoBtn', {
      content: 'Przejdź do strony głównej',
    });
  }

  private startLoginListener(): void {
    this.authService.loggedIn();
  }

  public closeNavigation() {
    if (this.navbarNav) {
      this.navbarNav.nativeElement.classList.remove('show');
    }
  }

  private getFavouriteList(): void {
    this.subscription = this.weatherService.favouritePlacesArray.subscribe(
      (res) => {
        this.favouriteItems = res;
      }
    );
  }

  public onLogout(): void {
    this.authService.toLogout();
  }
}
