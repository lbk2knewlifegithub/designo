import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '@lbk/models';
import { Store } from '@ngrx/store';
import { ProfileActions } from './actions';
import * as fromProfile from './profile.selectors';

/**
 * - Profile Facade
 */
@Injectable({ providedIn: 'root' })
export class ProfileFacade {
  user$: Observable<User | null> = this._store.select(fromProfile.selectUser);

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

  enter(user: User) {
    this._store.dispatch(ProfileActions.enter({ user }));
  }
}
