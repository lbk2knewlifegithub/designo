import { FamesFacade } from './fames.facade';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { FamesActions } from '../actions';
import { Fame } from '../models';
import * as fromWeek from '../selectors/week.selectors';

/**
 * - Week Facade
 */
@Injectable({ providedIn: 'root' })
export class WeekFacade implements FamesFacade {
  fames$: Observable<Fame[]> = this._store.select(
    fromWeek.selectAllFamesOfWeek
  );

  loading$: Observable<boolean | undefined> = this._store.select(
    fromWeek.selectLoading
  );
  loaded$: Observable<boolean | undefined> = this._store.select(
    fromWeek.selectLoaded
  );

  error$: Observable<string | undefined> = this._store.select(
    fromWeek.selectError
  );

  constructor(private readonly _store: Store) {}

  /**
   * - Load Fames Of Week
   */
  loadFames() {
    this.loaded$
      .pipe(take(1))
      .subscribe(
        (loaded) =>
          !loaded && this._store.dispatch(FamesActions.loadFamesOfWeek())
      );
  }
}
