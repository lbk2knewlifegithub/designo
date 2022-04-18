import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule } from '@lbk/comps';
import { COMPONENTS } from './components';
import { AboutPageComponent } from './containers';
import { AboutRoutingModule } from './about-routing.module';
import { LocationsLinkModule } from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    // Shared Component From Designo
    LocationsLinkModule,

    // Shared Component From Libs
    ImageModule,
  ],
  declarations: [COMPONENTS, AboutPageComponent],
})
export class AboutModule {}
