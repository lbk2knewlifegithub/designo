import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@lbk/directives';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  LatestChallengesModule,
  NewLetterModule,
  SlackModule,
  TechModule,
  ZigZagModule,
} from './../../shared';
import { COMPONENTS } from './components';
import { HomePageComponent } from './containers';
import { HomeRoutingModule } from './home-routing.module';
import { HomeEffects, homeFeature } from './state';

const CONTAINERS = [HomePageComponent];

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    // Shared Directives From Libs
    ScrollToModule,

    // Shared Components From FrontendMentor
    SlackModule,
    ZigZagModule,
    TechModule,
    NewLetterModule,
    LatestChallengesModule,

    // Stores
    StoreModule.forFeature(homeFeature),
    EffectsModule.forFeature([HomeEffects]),
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class HomeModule {}
