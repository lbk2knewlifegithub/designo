import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './auth.effects';
import * as fromAuth from './auth.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(fromAuth.authFeature),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthStateModule {}
