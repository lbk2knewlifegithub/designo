import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageModule } from '@lbk/comps';
import { LocationsLinkModule } from '../../shared';
import { COMPONENTS } from './components';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactPageComponent } from './containers';

@NgModule({
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,

    // Shared Component From Designo
    LocationsLinkModule,

    // Shared Component From Libs
    ImageModule,
  ],
  declarations: [COMPONENTS, ContactPageComponent],
})
export class ContactModule {}
