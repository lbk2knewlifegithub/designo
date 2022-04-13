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
   * - Pending
   */
  pending$ = this._store.select(fromProfile.selectPending);

  constructor(private readonly _store: Store) {}

  enter(user: User) {
    this._store.dispatch(ProfileActions.enter({ user }));
  }
}
