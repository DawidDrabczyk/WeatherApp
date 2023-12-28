import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { StationListComponent } from './station-list/station-list.component';

const routes: Route[] = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'list',
    component: StationListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
