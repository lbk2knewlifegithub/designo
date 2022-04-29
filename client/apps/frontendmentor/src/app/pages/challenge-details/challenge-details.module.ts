import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LightBoxModule } from '@lbk/comps';
import { ScrollToModule } from '@lbk/directives';
import { ObjectKeysPipeModule, WhiteSpacePipeModule } from '@lbk/pipes';
import {
  ChallengeTypeModule,
  DifficultyModule,
  FeatureModule,
  LanguageListModule,
  NewLetterModule,
  QuestionListModule,
  SlackModule,
  SubHeaderModule,
} from '../../shared';
import { ChallengeDetailsRoutingModule } from './challenge-details-routing.module';
import { COMPONENTS } from './components';
import { ChallengeDetailsPageComponent } from './containers';

@NgModule({
  imports: [
    CommonModule,
    ChallengeDetailsRoutingModule,
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
  ],
  declarations: [COMPONENTS, ChallengeDetailsPageComponent],
})
export class ChallengeDetailsModule {}
