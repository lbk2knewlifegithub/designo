import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@lbk/directives';
import { COMPONENTS } from './components';
import { ReportPageComponent } from './containers';
import { ReportRoutingModule } from './report-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule,
    // Shared Directives From Libs
    ScrollToModule,
  ],
  declarations: [COMPONENTS, ReportPageComponent],
})
export class ReportModule {}
