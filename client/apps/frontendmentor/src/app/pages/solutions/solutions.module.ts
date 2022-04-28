import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule } from '@lbk/comps';
import { ScrollToModule } from '@lbk/directives';
import { LanguageModule, NumberOfModule, SubHeaderModule } from '../../shared';
import { COMPONENTS } from './components';
import { SolutionsPageComponent } from './containers';
import { SolutionsRoutingModule } from './solutions-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SolutionsRoutingModule,
    // Shared Components From FrontendMentor
    SubHeaderModule,
    LanguageModule,
    NumberOfModule,
    // Shared Directives From Libs
    ScrollToModule,
    // Shared Components From Libs
    ImageModule,
  ],
  declarations: [COMPONENTS, SolutionsPageComponent],
})
export class SolutionsModule {}
