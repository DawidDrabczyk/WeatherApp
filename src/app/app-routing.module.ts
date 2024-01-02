import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { StationListComponent } from './station-list/station-list.component';
import { WeatherItemComponent } from './weather-item/weather-item.component';
import { FavouritePlacesComponent } from './favourite-places/favourite-places.component';

const routes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'list',
    component: StationListComponent,
  },
  {
    path: 'weather-data',
    component: WeatherItemComponent,
  },
  {
    path: 'favourite',
    component: FavouritePlacesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
