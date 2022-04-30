import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@lbk/directives';
import { QuestionListModule } from '../../../../../../shared';
import { COMPONENTS } from './components';
import { SolutionsPageComponent } from './containers';
import { SolutionsRoutingModule } from './solutions-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SolutionsRoutingModule,
    // Shared Directives From Libs
    ScrollToModule,

    // Shared Components From FrontendMentor
    QuestionListModule,
  ],
  declarations: [COMPONENTS, SolutionsPageComponent],
})
export class SolutionsModule {}
