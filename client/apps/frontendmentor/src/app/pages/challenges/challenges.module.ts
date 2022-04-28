import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClickOutsideModule, ScrollToModule } from '@lbk/directives';
import { ObjectKeysPipeModule } from '@lbk/pipes';
import {
  ChallengePreviewModule,
  NewLetterModule,
  SlackModule,
  SubHeaderModule,
} from '../../shared';
import { ChallengesRoutingModule } from './challenges-routing.module';
import { COMPONENTS } from './components';
import { ChallengesPageComponent } from './containers';

const CONTAINERS = [ChallengesPageComponent];

@NgModule({
  imports: [
    CommonModule,
    ChallengesRoutingModule,
    // Shared Pipes From Libs
    ObjectKeysPipeModule,

    // Shared Directives From Libs
    ScrollToModule,
    ClickOutsideModule,

    // Shared Components From FrontendMentor
    SlackModule,
    SubHeaderModule,
    NewLetterModule,
    ChallengePreviewModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class ChallengesModule {}
