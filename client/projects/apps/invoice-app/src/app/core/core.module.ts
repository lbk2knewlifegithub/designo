import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AttributionModule, ProfileButtonModule } from '@lbk/comps';
import { LogoModule } from '../shared';
import { COMPONENTS } from './components';
import { AppComponent, ShellComponent } from './containers';

const CONTAINERS = [AppComponent, ShellComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // Shared Components From Invoices
    LogoModule,
    // Shared Components From Libs
    AttributionModule,
    ProfileButtonModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class CoreModule {}
