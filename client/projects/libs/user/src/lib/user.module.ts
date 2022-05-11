import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from './effects/user.effects';
import * as fromAuth from './reducer/user.reducer';
import { RequiredLoginComponent } from './dialogs';

const COMPONENTS = [RequiredLoginComponent];

@NgModule({
  imports: [
    RouterModule,
    // Stores
    StoreModule.forFeature(fromAuth.userFeature),
    EffectsModule.forFeature([UserEffects]),
  ],
  declarations: COMPONENTS,
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule?: AuthModule
  ) {
    if (parentModule) {
      throw new Error(
        'AuthState is already loaded. Import it in the AppModule only'
      );
    }
  }
}
