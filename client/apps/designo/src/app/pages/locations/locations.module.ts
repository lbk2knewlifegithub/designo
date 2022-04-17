import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { ImageModule } from '@lbk/comps';
import { ScrollToModule } from '@lbk/directives';
import { ProjectLinksModule } from '../../shared';
import { COMPONENTS } from './components';
import { LocationsPageComponent } from './containers';
import { LocationsRoutingModule } from './locations-routing.module';
import { GOOGLE_MAP } from '@lbk/tokens';
import { environment as env } from '../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    LocationsRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,

    // Third Librarys
    GoogleMapsModule,

    // Shared Directives From Libs
    ScrollToModule,

    // Shared Component From Libs
    ImageModule,

    // Shared Component From Designo
    ProjectLinksModule,
  ],
  providers: [
    {
      provide: GOOGLE_MAP,
      useValue: env.googleMapToken,
    },
  ],
  declarations: [COMPONENTS, LocationsPageComponent],
})
export class LocationsModule {}
