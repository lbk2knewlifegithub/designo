import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@lbk/directives';
import {
  BriefModule,
  DifficultyModule,
  GetStartedModule,
  NewLetterModule,
  QuestionListModule,
  SlackModule,
} from '@lbk/fm/shared';
import { COMPONENTS } from './components';
import { OverviewPageComponent } from './containers';
import { OverviewRoutingModule } from './overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    OverviewRoutingModule,
    // Shared Directives From Libs
    ScrollToModule,

    // Shared Components From FrontendMentor
    QuestionListModule,
    BriefModule,
    GetStartedModule,
    DifficultyModule,
    SlackModule,
    NewLetterModule,
  ],
  declarations: [COMPONENTS, OverviewPageComponent],
})
export class OverviewModule {}
