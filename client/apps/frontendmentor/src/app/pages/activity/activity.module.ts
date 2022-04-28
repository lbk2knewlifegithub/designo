import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule } from '@lbk/comps';
import { ScrollToModule } from '@lbk/directives';
import {
  LanguageModule,
  MaskAsHelpFullModule,
  NumberOfModule,
  VoteModule,
} from '../../shared';
import { ActivityRoutingModule } from './activity-routing.module';
import { COMPONENTS } from './components';
import { ActivityPageComponent } from './containers';

@NgModule({
  imports: [
    CommonModule,
    ActivityRoutingModule,
    // Shared Components From FrontendMentor
    NumberOfModule,
    LanguageModule,
    VoteModule,
    MaskAsHelpFullModule,
    // Shared Directives From Libs
    ScrollToModule,
    ImageModule,
  ],
  declarations: [COMPONENTS, ActivityPageComponent],
})
export class ActivityModule {}
