import { ScrollToModule } from '@lbk/directives';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule } from '@lbk/comps';
import { COMPONENTS } from './components';
import { ContactPageComponent } from './containers';
import { ContactRoutingModule } from './contact-routing.module';
import { LocationsLinkModule } from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    ContactRoutingModule,
    // Shared Component From Designo
    LocationsLinkModule,

    // Shared Directives From Libs
    ScrollToModule,

    // Shared Component From Libs
    ImageModule,
  ],
  declarations: [COMPONENTS, ContactPageComponent],
})
export class ContactModule {}
