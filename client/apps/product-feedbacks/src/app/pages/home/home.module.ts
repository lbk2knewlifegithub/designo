import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropDownModule, MenuOneModule, SpinnerModule } from '@lbk/comps';
import { AvatarPipeModule, UpperPipeModule } from '@lbk/pipes';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  AddFeedbackButtonModule,
  FeedbackPreviewListModule,
  FeedbackPreviewModule,
} from '../../shared';
import { COMPONENTS } from './components';
import { CONTAINERS } from './containers';
import { HomeRoutingModule } from './home-routing.module';
import { HomeEffects } from './state/home.effects';
import { homeFeature } from './state/home.reducer';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    // Stores
    StoreModule.forFeature(homeFeature),
    EffectsModule.forFeature([HomeEffects]),
    // Shared Components From Feedbacks
    FeedbackPreviewModule,
    AddFeedbackButtonModule,
    FeedbackPreviewListModule,
    // Shared Components From Lib
    SpinnerModule,
    DropDownModule,
    MenuOneModule,
    UpperPipeModule,
    AvatarPipeModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class HomeModule {}
