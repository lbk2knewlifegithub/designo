import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AttributionModule, MenuOneModule } from '@lbk/comps';
import { ScrollToModule } from '@lbk/directives';
import { SocialsModule, SubHeaderModule } from '../shared';
import { COMPONENTS } from './components';
import { AppComponent } from './containers';

const CONTAINERS = [AppComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // Shared Components from Frontend Mentor
    SocialsModule,
    SubHeaderModule,
    // Shared Components from Libs
    AttributionModule,
    ScrollToModule,
    MenuOneModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class CoreModule {}
