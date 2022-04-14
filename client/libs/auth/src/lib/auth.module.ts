import { RequiredLoginComponent } from './dialogs';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './auth.effects';
import * as fromAuth from './auth.reducer';

const COMPONENTS = [RequiredLoginComponent];

@NgModule({
  imports: [
    RouterModule,
    // Stores
    StoreModule.forFeature(fromAuth.authFeature),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: COMPONENTS,
})
export class AuthStateModule {}
