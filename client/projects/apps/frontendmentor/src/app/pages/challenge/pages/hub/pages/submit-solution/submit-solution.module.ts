import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwitchModule, InputModule, SpinnerModule } from '@lbk/comps';
import { ScrollToModule } from '@lbk/directives';
import {
  NewLetterModule,
  QuestionListModule,
  SlackModule,
  AddCommentInputComponentModule,
} from '@lbk/fm/shared';
import { COMPONENTS } from './components';
import { SubmitSolutionPageComponent } from './containers';
import { SubmitSolutionRoutingModule } from './submit-solution-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    SubmitSolutionRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,

    // Shared Directives From Libs
    ScrollToModule,
    // Shared Components From Libs
    InputModule,
    SpinnerModule,

    // Shared Components From FrontendMentor
    QuestionListModule,
    SwitchModule,
    SlackModule,
    NewLetterModule,
    AddCommentInputComponentModule,
  ],
  declarations: [COMPONENTS, SubmitSolutionPageComponent],
})
export class SubmitSolutionModule {}
