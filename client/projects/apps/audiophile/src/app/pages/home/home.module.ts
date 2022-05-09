import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule } from '@lbk/comps';
import { CategoryPreviewListModule, TheBestModule } from '../../shared';
import * as fromHomeComponents from './components';
import * as fromHomeContainers from './containers';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    // Shared Components from Audiophile
    TheBestModule,
    CategoryPreviewListModule,
    // Shared Components from Libs
    ImageModule,
  ],
  declarations: [fromHomeComponents.COMPONENTS, fromHomeContainers.CONTAINERS],
})
export class HomeModule {}
