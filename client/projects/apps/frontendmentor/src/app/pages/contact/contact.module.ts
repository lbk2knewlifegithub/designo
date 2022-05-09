import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@lbk/directives';
import { QuestionListModule, SlackModule, SubHeaderModule } from '../../shared';
import { COMPONENTS } from './components';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactPageComponent } from './containers';

@NgModule({
  imports: [
    CommonModule,
    ContactRoutingModule,
    // Shared Directives From Libs
    ScrollToModule,

    // Shared Components From FrontendMentor
    QuestionListModule,
    SubHeaderModule,
    SlackModule,
  ],
  declarations: [COMPONENTS, ContactPageComponent],
})
export class ContactModule {}
