import { FamesFacade } from './fames.facade';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { FamesActions } from '../actions';
import { Fame } from '../models';
import * as fromMonth from '../selectors/month.selectors';

/**
 * - Month Facade
 */
@Injectable({ providedIn: 'root' })
export class MonthFacade implements FamesFacade {
  fames$: Observable<Fame[]> = this._store.select(
    fromMonth.selectAllFamesOfMonth
  );

  loading$: Observable<boolean | undefined> = this._store.select(
    fromMonth.selectLoading
  );
  loaded$: Observable<boolean | undefined> = this._store.select(
    fromMonth.selectLoaded
  );

  error$: Observable<string | undefined> = this._store.select(
    fromMonth.selectError
  );

  constructor(private readonly _store: Store) {}

  /**
   * - Load Fames Of Month
   */
  loadFames() {
    this.loaded$
      .pipe(take(1))
      .subscribe(
        (loaded) =>
          !loaded && this._store.dispatch(FamesActions.loadFamesOfMonth())
      );
  }
}
