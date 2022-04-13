import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropDownModule, MenuOneModule, SpinnerModule } from '@lbk/comps';
import {
  AvatarPipeModule,
  NeverChangePipeModule,
  UpperPipeModule,
} from '@lbk/pipes';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CONTAINERS } from './containers';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  declarations: [CONTAINERS],
})
export class HomeModule {}
