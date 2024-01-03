import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherItemDto } from '../models/weather-item-dto.model';
import { WeatherService } from '../weather.service';
import {
  DatePipe,
  NgClass,
  NgFor,
  NgSwitch,
  NgSwitchCase,
  UpperCasePipe,
} from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favourite-places',
  standalone: true,
  imports: [NgFor, NgSwitch, NgSwitchCase, NgClass, UpperCasePipe, DatePipe],
  templateUrl: './favourite-places.component.html',
  styleUrl: './favourite-places.component.scss',
})
export class FavouritePlacesComponent implements OnInit, OnDestroy {
  public favouriteItems!: Array<WeatherItemDto>;
  private subscription?: Subscription;

  constructor(private weatherService: WeatherService, private router: Router) {}

  ngOnInit(): void {
    this.getFavouriteList();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public removeFromFavourite(weatherItem: WeatherItemDto): void {
    const index = this.weatherService.favouriteItems.findIndex(
      (item) => item.id === weatherItem.id
    );

    if (index !== -1) {
      this.weatherService.favouriteItems.splice(index, 1);
      weatherItem.isFavourite = false;
      window.scrollTo(0, 0);

      this.weatherService.favouritePlacesArray.next(
        this.weatherService.favouriteItems
      );
    }

    if (this.weatherService.favouriteItems.length === 0) {
      this.router.navigate(['./']);
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
