import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ZippyModule } from '@lbk/comps';
import { QuestionListModule } from '../../shared';
import { COMPONENTS } from './components';
import { FAQPageComponent } from './containers';
import { ScrollToModule } from '@lbk/directives';
import { FAQRoutingModule } from './faq-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FAQRoutingModule,
    // Shared Directives From Libs
    ScrollToModule,

    // Shared Components From Libs
    ZippyModule,
    // Shared Components From FrontendMentor
    QuestionListModule,
  ],
  declarations: [COMPONENTS, FAQPageComponent],
})
export class FAQModule {}
