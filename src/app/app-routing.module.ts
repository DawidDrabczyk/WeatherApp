import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./station-list/station-list.component').then(
        (mod) => mod.StationListComponent
      ),
  },
  {
    path: 'weather-data',
    loadComponent: () =>
      import('./weather-item/weather-item.component').then(
        (mod) => mod.WeatherItemComponent
      ),
  },
  {
    path: 'webcamera',
    loadComponent: () =>
      import('./webcamera/webcamera.component').then(
        (mod) => mod.WebcameraComponent
      ),
  },
  {
    path: 'favourite',
    loadComponent: () =>
      import('./favourite-places/favourite-places.component').then(
        (mod) => mod.FavouritePlacesComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
