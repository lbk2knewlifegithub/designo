import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromProfile from './profile.selectors';

/**
 * - Profile Facade
 */
@Injectable({ providedIn: 'root' })
export class ProfileFacade {
  /**
   * - Changing Password
   */
  // changingPassword$ = this._store.select(fromProfile.selectCategory);
  requestingVerifyEmail$ = this._store.select(
    fromProfile.selectRequestingVerifyEmail
  );

  updatingAccount$ = this._store.select(
    fromProfile.selectRequestingVerifyEmail
  );

  constructor(private readonly _store: Store) {}
}
