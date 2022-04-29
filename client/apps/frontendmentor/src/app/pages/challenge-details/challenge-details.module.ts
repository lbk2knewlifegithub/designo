import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@lbk/directives';
import { ObjectKeysPipeModule, WhiteSpacePipeModule } from '@lbk/pipes';
import {
  DifficultyModule,
  FeatureModule,
  LanguageModule,
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

    // Shared Pipes From Libs
    ObjectKeysPipeModule,
    WhiteSpacePipeModule,

    // Shared Components From FrontendMentor
    SubHeaderModule,
    LanguageModule,
    DifficultyModule,
    FeatureModule,
    QuestionListModule,
    SlackModule,
    NewLetterModule,
  ],
  declarations: [COMPONENTS, ChallengeDetailsPageComponent],
})
export class ChallengeDetailsModule {}
