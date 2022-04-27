import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AttributionModule, MenuOneModule } from '@lbk/comps';
import { ScrollToModule } from '@lbk/directives';
import { SocialsModule } from '../shared';
import { COMPONENTS } from './components';
import { AppComponent } from './containers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // Shared Components from Frontend Mentor
    SocialsModule,
    // Shared Components from Libs
    AttributionModule,
    ScrollToModule,
    MenuOneModule,
  ],
  declarations: [COMPONENTS, AppComponent],
})
export class CoreModule {}
