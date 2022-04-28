import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@lbk/directives';
import { LanguageModule } from '../../shared';
import { COMPONENTS } from './components';
import { WallOfFamePageComponent } from './containers';
import { WallOfFameRoutingModule } from './wall-of-fame-routing.module';

@NgModule({
  imports: [
    CommonModule,
    WallOfFameRoutingModule,
    // Shared Components From FrontendMentor
    LanguageModule,
    // Shared Directives From Libs
    ScrollToModule,
  ],
  declarations: [COMPONENTS, WallOfFamePageComponent],
})
export class WallOfFameModule {}
