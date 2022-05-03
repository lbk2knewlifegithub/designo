import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ZippyModule } from '@lbk/comps';
import { ScrollToModule } from '@lbk/directives';
import { QuestionListModule } from '../../shared';
import { COMPONENTS } from './components';
import { FeedPageComponent } from './containers';
import { FeedRoutingModule } from './feed-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FeedRoutingModule,
    // Shared Directives From Libs
    ScrollToModule,

    // Shared Components From Libs
    ZippyModule,
    // Shared Components From FrontendMentor
    QuestionListModule,
  ],
  declarations: [COMPONENTS, FeedPageComponent],
})
export class FeedModule {}
