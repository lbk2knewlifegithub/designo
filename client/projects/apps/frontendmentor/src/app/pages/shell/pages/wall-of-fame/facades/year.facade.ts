import { FamesFacade } from './fames.facade';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { FamesActions } from '../actions';
import { Fame } from '../models';
import * as fromYear from '../selectors/year.selectors';

/**
 * - Year Facade
 */
@Injectable({ providedIn: 'root' })
export class YearFacade implements FamesFacade {
  fames$: Observable<Fame[]> = this._store.select(
    fromYear.selectAllFamesOfYear
  );

  loading$: Observable<boolean | undefined> = this._store.select(
    fromYear.selectLoading
  );
  loaded$: Observable<boolean | undefined> = this._store.select(
    fromYear.selectLoaded
  );

  error$: Observable<string | undefined> = this._store.select(
    fromYear.selectError
  );

  constructor(private readonly _store: Store) {}

  /**
   * - Load Fames Of Year
   */
  loadFames() {
    this.loaded$
      .pipe(take(1))
      .subscribe(
        (loaded) =>
          !loaded && this._store.dispatch(FamesActions.loadFamesOfYear())
      );
  }
}
