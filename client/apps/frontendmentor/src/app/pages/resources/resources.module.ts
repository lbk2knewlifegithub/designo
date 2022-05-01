import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule, SpinnerModule } from '@lbk/comps';
import { ClickOutsideModule, ScrollToModule } from '@lbk/directives';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  LanguageListModule, LatestChallengesModule,
  NewLetterModule,
  SlackModule,
  SocialsModule
} from '../../shared';
import { COMPONENTS } from './components';
import { ResourcesPageComponent } from './containers';
import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesEffects, resourcesFeature } from './state';

@NgModule({
  imports: [
    CommonModule,
    ResourcesRoutingModule,
    // Stores
    StoreModule.forFeature(resourcesFeature),
    EffectsModule.forFeature([ResourcesEffects]),

    // Shared Directives From Libs
    ScrollToModule,
    ImageModule,
    NewLetterModule,
    SlackModule,
    LatestChallengesModule,
    SpinnerModule,
    ClickOutsideModule,

    // Shared Directives From FrontendMentor
    LanguageListModule,
    SocialsModule,
  ],
  declarations: [COMPONENTS, ResourcesPageComponent],
})
export class ResourcesModule {}
