import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@lbk/directives';
import {
  AddCommentInputComponentModule,
  DifficultyModule,
  LanguageListModule,
  SlackModule,
  SubHeaderModule,
} from '@lbk/fm/shared';
import {
  PixelPipeModule,
  TimeAgoPipeModule,
  AvatarPipeModule,
} from '@lbk/pipes';
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
    TimeAgoPipeModule,
    AvatarPipeModule,
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
