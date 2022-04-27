import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@lbk/directives';
import {
  LatestChallengesModule,
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
    // Shared Directives From Libs
    ScrollToModule,

    // Shared Components From FrontendMentor
    SlackModule,
    SubHeaderModule,
    NewLetterModule,
    LatestChallengesModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class ChallengesModule {}
