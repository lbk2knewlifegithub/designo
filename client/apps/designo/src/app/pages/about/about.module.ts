import { ScrollToModule } from '@lbk/directives';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule } from '@lbk/comps';
import { COMPONENTS } from './components';
import { AboutPageComponent } from './containers';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    // Shared Directives From Libs
    ScrollToModule,

    // Shared Component From Libs
    ImageModule,
  ],
  declarations: [COMPONENTS, AboutPageComponent],
})
export class AboutModule {}
