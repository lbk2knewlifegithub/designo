import { FamesFacade } from './fames.facade';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { FamesActions } from '../actions';
import { Fame } from '../models';
import * as fromAllTime from '../selectors/all-time.selectors';

/**
 * - Fames Of All time Facade
 */
@Injectable({ providedIn: 'root' })
export class AllTimeFacade implements FamesFacade {
  fames$: Observable<Fame[]> = this._store.select(
    fromAllTime.selectAllFamesOfAllTime
  );

  loading$: Observable<boolean | undefined> = this._store.select(
    fromAllTime.selectLoading
  );
  loaded$: Observable<boolean | undefined> = this._store.select(
    fromAllTime.selectLoaded
  );

  error$: Observable<string | undefined> = this._store.select(
    fromAllTime.selectError
  );

  constructor(private readonly _store: Store) {}

  /**
   * - Load Fames Of AllTime
   */
  loadFames() {
    this.loaded$
      .pipe(take(1))
      .subscribe(
        (loaded) =>
          !loaded && this._store.dispatch(FamesActions.loadFamesOfAllTime())
      );
  }
}
