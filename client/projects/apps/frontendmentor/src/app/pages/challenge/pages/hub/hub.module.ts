import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SubHeaderModule } from '@lbk/fm/shared';
import { HubPageComponent } from './containers';
import { HubRoutingModule } from './hub-routing.module';
import * as fromHub from './reducer';
import { HubEffects } from './effects';

@NgModule({
  imports: [
    CommonModule,
    HubRoutingModule,
    // Stores
    StoreModule.forFeature(fromHub.hubFeatureKey, fromHub.reducer),
    EffectsModule.forFeature([HubEffects]),

    // Shared Components From FrontendMentor
    SubHeaderModule,
  ],
  declarations: [HubPageComponent],
})
export class HubModule {}
