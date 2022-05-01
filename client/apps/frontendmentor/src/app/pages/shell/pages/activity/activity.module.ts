import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule } from '@lbk/comps';
import { ScrollToModule } from '@lbk/directives';
import {
  ActivityPreviewModule,
  LanguageListModule,
  MaskAsHelpFullModule,
  NumberOfModule,
  VoteModule,
} from '@lbk/fm/shared';
import { ActivityRoutingModule } from './activity-routing.module';
import { COMPONENTS } from './components';
import { ActivityPageComponent } from './containers';

@NgModule({
  imports: [
    CommonModule,
    ActivityRoutingModule,
    // Shared Components From FrontendMentor
    NumberOfModule,
    LanguageListModule,
    VoteModule,
    MaskAsHelpFullModule,
    ActivityPreviewModule,
    // Shared Directives From Libs
    ScrollToModule,
    ImageModule,
  ],
  declarations: [COMPONENTS, ActivityPageComponent],
})
export class ActivityModule {}
