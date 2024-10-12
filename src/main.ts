import { ApplicationConfig } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
// import { NhacungcapListComponent } from './app/nhacungcaps/nhacungcap-list/nhacungcap-list.component';
// import { NhacungcapFormComponent } from './app/nhacungcaps/nhacungcap-form/nhacungcap-form.component';
// import { TraicayListComponent } from './app/traicays/traicay-list/traicay-list.component';
// import { TraicayFormComponent } from './app/traicays/traicay-form/traicay-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';

const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    ReactiveFormsModule,
  ]
};

bootstrapApplication(AppComponent, appConfig);