import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, HomePageComponent, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [HttpClient]
})
export class AppComponent {
  title = 'weather-app';
}
