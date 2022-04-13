import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CoreActions from './core.actions';
import * as fromCore from './core.selectors';

@Injectable({ providedIn: 'root' })
export class CoreFacade {
  showRequiredLogin$: Observable<boolean> = this._store.select(
    fromCore.selectShownRequiredLogin
  );

  constructor(private readonly _store: Store) {}

  /**
   * - Close Required Login
   */
  closeRequiredLogin() {
    return this._store.dispatch(CoreActions.closeRequiredLogin());
  }

  /**
   * - Show Required Login
   */
  showRequiredLogin() {
    return this._store.dispatch(CoreActions.showRequiredLogin());
  }
}
