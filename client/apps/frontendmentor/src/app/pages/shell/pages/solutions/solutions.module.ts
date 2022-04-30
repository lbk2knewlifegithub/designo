import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule } from '@lbk/comps';
import { ScrollToModule } from '@lbk/directives';
import {
  LanguageListModule,
  NumberOfModule,
  SubHeaderModule,
} from '@lbk/fm/shared';
import { COMPONENTS } from './components';
import { SolutionsPageComponent } from './containers';
import { SolutionsRoutingModule } from './solutions-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SolutionsRoutingModule,
    // Shared Components From FrontendMentor
    SubHeaderModule,
    LanguageListModule,
    NumberOfModule,
    // Shared Directives From Libs
    ScrollToModule,
    // Shared Components From Libs
    ImageModule,
  ],
  declarations: [COMPONENTS, SolutionsPageComponent],
})
export class SolutionsModule {}
