import { ScrollToModule } from '@lbk/directives';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule } from '@lbk/comps';
import { COMPONENTS } from './components';
import { HomePageComponent } from './containers';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    // Shared Directives From Libs

    // Shared Component From Libs
    ImageModule,
    ScrollToModule,
  ],
  declarations: [COMPONENTS, HomePageComponent],
})
export class HomeModule {}
