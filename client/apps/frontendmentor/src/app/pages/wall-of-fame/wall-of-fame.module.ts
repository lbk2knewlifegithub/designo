import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule, SpinnerModule } from '@lbk/comps';
import { ScrollToModule } from '@lbk/directives';
import { LongNumberPipeModule } from '@lbk/pipes';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LanguageModule, NewLetterModule, SlackModule } from '../../shared';
import { COMPONENTS } from './components';
import { WallOfFamePageComponent } from './containers';
import { FamesEffects } from './effects';
import * as fromFames from './reducers';
import { FamesFakeService } from './services';
import { FAMES_SERVICE } from './tokens';
import { WallOfFameRoutingModule } from './wall-of-fame-routing.module';

@NgModule({
  imports: [
    CommonModule,
    WallOfFameRoutingModule,
    // Stores
    StoreModule.forFeature(fromFames.famesFeatureKey, fromFames.reducers),
    EffectsModule.forFeature([FamesEffects]),

    // Shared Components From FrontendMentor
    LanguageModule,
    SlackModule,
    NewLetterModule,

    // Shared Pipes From Libs
    LongNumberPipeModule,

    // Shared Directives From Libs
    ScrollToModule,

    // Shared Components From Libs
    ImageModule,
    SpinnerModule,
  ],
  providers: [
    {
      provide: FAMES_SERVICE,
      useClass: FamesFakeService,
    },
  ],
  declarations: [COMPONENTS, WallOfFamePageComponent],
})
export class WallOfFameModule {}
