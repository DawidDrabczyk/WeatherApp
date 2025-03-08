import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
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
      import('./weather/weather-item/weather-item.component').then(
        (mod) => mod.WeatherItemComponent
      ),
  },
  {
    path: 'weather-forecast',
    loadComponent: () =>
      import('./weather/weather-forecast/weather-forecast.component').then(
        (mod) => mod.WeatherForecast
      ),
  },
  {
    path: 'air-pollution',
    loadComponent: () =>
      import('./air-pollution/air-pollution.component').then(
        (mod) => mod.AirPollutionComponent
      ),
  },
  {
    path: 'webcamera',
    loadComponent: () =>
      import('./web-tv/webcamera/webcamera.component').then(
        (mod) => mod.WebcameraComponent
      ),
  },
  {
    path: 'world-camera',
    loadComponent: () =>
      import('./web-tv/world-camera/world-camera.component').then(
        (mod) => mod.WorldCameraComponent
      ),
  },
  {
    path: 'favourite',
    loadComponent: () =>
      import('./weather/favourite-places/favourite-places.component').then(
        (mod) => mod.FavouritePlacesComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
