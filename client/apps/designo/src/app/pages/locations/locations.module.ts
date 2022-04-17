import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { ImageModule } from '@lbk/comps';
import { ScrollToModule } from '@lbk/directives';
import { GOOGLE_MAP } from '@lbk/tokens';
import { environment as env } from '../../../environments/environment';
import { COMPONENTS } from './components';
import { LocationsPageComponent } from './containers';
import { LocationsRoutingModule } from './locations-routing.module';

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
