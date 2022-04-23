import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { TitleEffects } from '@lbk/effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { ChallengesEffects } from './effects';
import { metaReducers, ROOT_REDUCERS } from './reducers';

@NgModule({
  imports: [
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateSerializability: true,
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictActionTypeUniqueness: true,
        strictActionWithinNgZone: true,
      },
    }),
    EffectsModule.forRoot([TitleEffects, ChallengesEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    StoreRouterConnectingModule.forRoot(),
  ],
})
export class StateModule {
  static forRoot(): ModuleWithProviders<StateModule> {
    return {
      ngModule: StateModule,
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule?: StateModule
  ) {
    if (parentModule) {
      throw new Error(
        'StateModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
