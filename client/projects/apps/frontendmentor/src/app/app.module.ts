import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@lbk/auth';
import { DDosInterceptor, JwtInterceptor } from '@lbk/interceptors';
import { LoginOAuthModule } from '@lbk/pages';
import { API_URL, CURRENT_HOST, GITHUB_OAUTH_CLIENT_ID } from '@lbk/tokens';
import { DialogModule } from '@ngneat/dialog';
import { MarkdownModule } from 'ngx-markdown';
import { environment as env, environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, CoreModule } from './core';
import { CHALLENGES_SERVICE } from './shared';
import { ChallengesImplService, StateModule } from './state';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    StateModule.forRoot(),
    HttpClientModule,

    // Thirds Libs
    DialogModule.forRoot(),
    MarkdownModule.forRoot(),
    // Shared Auth From Libs
    AuthModule.forRoot(),
    // Shared Pages From Libs
    LoginOAuthModule,
  ],
  providers: [
    {
      provide: API_URL,
      useValue: environment.apiUrl,
    },
    {
      provide: GITHUB_OAUTH_CLIENT_ID,
      useValue: environment.githubOAuthClientId,
    },
    {
      provide: CURRENT_HOST,
      useValue: environment.currentHost,
    },
    {
      provide: CHALLENGES_SERVICE,
      // useClass: env.production ? ChallengesImplService : ChallengesFakeService,
      useClass: ChallengesImplService,
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
