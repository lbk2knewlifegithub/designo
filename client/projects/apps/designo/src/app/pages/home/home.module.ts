import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule } from '@lbk/comps';
import { SlugPipeModule } from '@lbk/pipes';
import { COMPONENTS } from './components';
import { HomePageComponent } from './containers';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,

    // Shared Pipe From Libs
    SlugPipeModule,

    // Shared Component From Libs
    ImageModule,

    // Shared Component From Designo
  ],
  declarations: [COMPONENTS, HomePageComponent],
})
export class HomeModule {}
