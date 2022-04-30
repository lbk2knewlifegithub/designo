import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwitchModule } from '@lbk/comps';
import { ScrollToModule } from '@lbk/directives';
import {
  NewLetterModule,
  QuestionListModule,
  SlackModule,
} from '@lbk/fm/shared';
import { COMPONENTS } from './components';
import { SubmitSolutionPageComponent } from './containers';
import { SubmitSolutionRoutingModule } from './submit-solution-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SubmitSolutionRoutingModule,
    // Shared Directives From Libs
    ScrollToModule,

    // Shared Components From FrontendMentor
    QuestionListModule,
    SwitchModule,
    SlackModule,
    NewLetterModule,
  ],
  declarations: [COMPONENTS, SubmitSolutionPageComponent],
})
export class SubmitSolutionModule {}
