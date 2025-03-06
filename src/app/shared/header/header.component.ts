import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
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

@Component({
  selector: 'app-header',
  imports: [RouterModule, NgIf],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [WeatherService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  public favouriteItems: Array<WeatherItemDto> = [];
  private subscription?: Subscription;

  @ViewChild('navbarNav', { static: false }) navbarNav?: ElementRef;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getFavouriteList();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngAfterViewInit() {
    tippy('#logoBtn', {
      content: 'Przejdź do strony głównej',
    });
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
}
