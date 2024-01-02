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

@Component({
  selector: 'app-favourite-places',
  standalone: true,
  imports: [NgFor, NgSwitch, NgSwitchCase, NgClass, UpperCasePipe, DatePipe],
  templateUrl: './favourite-places.component.html',
  styleUrl: './favourite-places.component.scss',
})
export class FavouritePlacesComponent implements OnInit {
  public favouriteItems!: Array<WeatherItemDto>;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getFavouriteList();
  }

  private getFavouriteList(): void {
    this.weatherService.favouritePlacesArray.subscribe((res) => {
      this.favouriteItems = res;
    });
  }
}
