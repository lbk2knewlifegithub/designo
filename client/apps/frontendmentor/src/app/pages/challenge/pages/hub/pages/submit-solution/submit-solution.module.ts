import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@lbk/directives';
import { QuestionListModule } from '../../../../../../shared';
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
  ],
  declarations: [COMPONENTS, SubmitSolutionPageComponent],
})
export class SubmitSolutionModule {}
