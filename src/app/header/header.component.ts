import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherItemDto } from '../models/weather-item-dto.model';
import { WeatherService } from '../weather.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public favouriteItems: Array<WeatherItemDto> = [];

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
