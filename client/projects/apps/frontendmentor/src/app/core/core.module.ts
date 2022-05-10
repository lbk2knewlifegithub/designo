import { LoggedInDirectiveModule } from '@lbk/directives';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AttributionModule,
  ProfileButtonModule,
  MenuOneModule,
} from '@lbk/comps';
import { ClickOutsideModule, ScrollToModule } from '@lbk/directives';
import { SocialsModule, SubHeaderModule } from '../shared';
import { COMPONENTS } from './components';
import { AppComponent, ShellComponent } from './containers';

const CONTAINERS = [AppComponent, ShellComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // Shared Components from Frontend Mentor
    SocialsModule,
    SubHeaderModule,
    ClickOutsideModule,
    // Shared Components from Libs
    AttributionModule,
    ScrollToModule,
    MenuOneModule,
    ProfileButtonModule,
    // Shared Directives from Libs
    LoggedInDirectiveModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class CoreModule {}
