import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@lbk/directives';
import { ZigZagModule } from '../../shared';
import { COMPONENTS } from './components';
import { HiringPageComponent } from './containers';
import { HiringRoutingModule } from './hiring-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HiringRoutingModule,
    // Shared Directives From Libs
    ScrollToModule,
    // Shared Components From FrontendMentor
    ZigZagModule,
  ],
  declarations: [COMPONENTS, HiringPageComponent],
})
export class HiringModule {}
