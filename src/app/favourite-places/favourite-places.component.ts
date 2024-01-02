import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-favourite-places',
  standalone: true,
  imports: [NgFor, NgSwitch, NgSwitchCase, NgClass, UpperCasePipe, DatePipe],
  templateUrl: './favourite-places.component.html',
  styleUrl: './favourite-places.component.scss',
})
export class FavouritePlacesComponent implements OnInit {
  public favouriteItems!: Array<WeatherItemDto>;

  constructor(private weatherService: WeatherService, private router: Router) {}

  ngOnInit(): void {
    this.getFavouriteList();
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
    this.weatherService.favouritePlacesArray.subscribe((res) => {
      this.favouriteItems = res;
    });
  }
}
