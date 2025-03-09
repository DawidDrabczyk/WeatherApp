import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { AppRoutingModule } from './app/app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideRouter, withViewTransitions } from '@angular/router';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';
import { provideToastr } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(AppRoutingModule),
    importProvidersFrom(MatDialogModule),
    importProvidersFrom(FontAwesomeModule),
    importProvidersFrom(BrowserAnimationsModule),
    provideRouter(routes, withViewTransitions()),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      timeOut: 5000,
      extendedTimeOut: 2000,
      progressBar: true,
    }),
  ],
}).catch((err) => console.error(err));
