import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@lbk/directives';
import { COMPONENTS } from './components';
import { DashboardPageComponent } from './containers';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // Shared Directives From Libs
    ScrollToModule,
  ],
  declarations: [COMPONENTS, DashboardPageComponent],
})
export class DashboardModule {}
