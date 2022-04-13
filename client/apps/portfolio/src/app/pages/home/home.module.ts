import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CONTAINERS } from './containers';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  declarations: [CONTAINERS],
})
export class HomeModule {}
