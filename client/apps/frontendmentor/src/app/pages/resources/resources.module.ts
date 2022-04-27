import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule, SpinnerModule } from '@lbk/comps';
import { ScrollToModule } from '@lbk/directives';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  LatestChallengesModule,
  NewLetterModule,
  SlackModule,
  TechModule,
} from '../../shared';
import { SocialsModule } from '../../shared/comps/socials/socials.component';
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

    // Shared Directives From FrontendMentor
    TechModule,
    SocialsModule,
  ],
  declarations: [COMPONENTS, ResourcesPageComponent],
})
export class ResourcesModule {}
