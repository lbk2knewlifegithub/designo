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
import { OrderSuccessModule } from '../shared';
import { CartEffects, LayoutEffects } from './effects';
import { metaReducers, ROOT_REDUCERS } from './reducers';

@NgModule({
  imports: [
    // Shared Components From Audiophile
    OrderSuccessModule,

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
    EffectsModule.forRoot([TitleEffects, CartEffects, LayoutEffects]),

    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'Product feedback',
      maxAge: 25,
      autoPause: true,
      logOnly: true,
    }),
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
        'StateRootModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
