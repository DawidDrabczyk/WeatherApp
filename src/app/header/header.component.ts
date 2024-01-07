import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherItemDto } from '../models/weather-item-dto.model';
import { WeatherService } from '../weather.service';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import tippy from 'tippy.js';
declare var bootstrap: any;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
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
