import { AddCommentInputComponentModule } from './../../shared/comps/add-comment-input/add-comment-input.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@lbk/directives';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  DifficultyModule,
  LanguageListModule,
  SlackModule,
  SubHeaderModule,
} from '@lbk/fm/shared';
import { PixelPipeModule } from '@lbk/pipes';
import { COMPONENTS } from './components';
import { SolutionPageComponent } from './containers';
import { PIPES } from './pipes';
import { SolutionRoutingModule } from './solution-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SolutionRoutingModule,
    // Shared Directives From Libs
    ScrollToModule,
    // Shared Pipes From Libs
    PixelPipeModule,
    // Shared Components From FrontendMentor
    SubHeaderModule,
    SlackModule,
    LanguageListModule,
    DifficultyModule,
    AddCommentInputComponentModule,
  ],
  declarations: [COMPONENTS, PIPES, SolutionPageComponent],
})
export class SolutionModule {}
