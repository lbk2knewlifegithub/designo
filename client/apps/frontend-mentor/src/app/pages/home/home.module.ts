import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { COMPONENTS } from './components';
import { HomePageComponent } from './containers';
import { HomeRoutingModule } from './home-routing.module';
import { HomeEffects, homeFeature } from './state';

const CONTAINERS = [HomePageComponent];

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    // Stores
    StoreModule.forFeature(homeFeature),
    EffectsModule.forFeature([HomeEffects]),
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class HomeModule {}
