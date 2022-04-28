import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule, SpinnerModule } from '@lbk/comps';
import { ScrollToModule, ClickOutsideModule } from '@lbk/directives';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  LatestChallengesModule,
  NewLetterModule,
  SlackModule,
  SocialsModule,
  LanguageModule,
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
    LanguageModule,
    SocialsModule,
  ],
  declarations: [COMPONENTS, ResourcesPageComponent],
})
export class ResourcesModule {}
