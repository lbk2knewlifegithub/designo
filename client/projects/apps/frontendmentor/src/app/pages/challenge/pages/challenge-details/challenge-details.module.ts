import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LightBoxModule } from '@lbk/comps';
import { ScrollToModule } from '@lbk/directives';
import {
  BriefModule,
  ChallengeTypeModule,
  DifficultyModule,
  FeatureModule,
  GetStartedModule,
  LanguageListModule,
  NewLetterModule,
  QuestionListModule,
  SlackModule,
  SubHeaderModule,
} from '@lbk/fm/shared';
import { ObjectKeysPipeModule, WhiteSpacePipeModule } from '@lbk/pipes';
import { ChallengeDetailsRoutingModule } from './challenge-details-routing.module';
import { COMPONENTS } from './components';
import { ChallengeDetailsPageComponent } from './containers';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  imports: [
    CommonModule,
    ChallengeDetailsRoutingModule,
    // Third Libs
    MarkdownModule.forChild(),
    // Shared Directives From Libs
    ScrollToModule,

    // Shared Components From Libs
    LightBoxModule,
    // Shared Pipes From Libs
    ObjectKeysPipeModule,
    WhiteSpacePipeModule,

    // Shared Components From FrontendMentor
    SubHeaderModule,
    LanguageListModule,
    DifficultyModule,
    FeatureModule,
    QuestionListModule,
    SlackModule,
    NewLetterModule,
    ChallengeTypeModule,
    BriefModule,
    GetStartedModule,
  ],
  declarations: [COMPONENTS, ChallengeDetailsPageComponent],
})
export class ChallengeDetailsModule {}
