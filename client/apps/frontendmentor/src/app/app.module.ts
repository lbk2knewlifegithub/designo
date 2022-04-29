import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@lbk/auth';
import { DDosInterceptor, JwtInterceptor } from '@lbk/interceptors';
import { API_URL } from '@lbk/tokens';
import { DialogModule } from '@ngneat/dialog';
import { NxModule } from '@nrwl/angular';
import { environment as env, environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, CoreModule } from './core';
import { CHALLENGES_SERVICE } from './shared';
import { StateModule } from './state';
import { ChallengesFakeService, ChallengesImplService } from './state';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    NxModule.forRoot(),
    StateModule.forRoot(),
    HttpClientModule,
    // Thirds Libs
    DialogModule.forRoot(),
    AuthModule.forRoot(),
  ],
  providers: [
    {
      provide: API_URL,
      useValue: environment.apiUrl,
    },
    {
      provide: CHALLENGES_SERVICE,
      useClass: env.production ? ChallengesImplService : ChallengesFakeService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DDosInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
