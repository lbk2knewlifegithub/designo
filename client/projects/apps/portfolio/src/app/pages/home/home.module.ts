import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CONTAINERS } from './containers';
import { HomeRoutingModule } from './home-routing.module';
import { COMPONENTS } from './components';

@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  declarations: [CONTAINERS, COMPONENTS],
})
export class HomeModule {}
