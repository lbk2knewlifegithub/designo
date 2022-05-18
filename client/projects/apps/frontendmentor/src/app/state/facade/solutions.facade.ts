import { Inject, Injectable } from '@angular/core';
import { Solution } from '@lbk/fm/shared';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of, take } from 'rxjs';
import { SOLUTIONS_SERVICE } from '../../shared';
import { SolutionsActions } from '../actions';
import { fromSolutions } from '../selectors';
import { SolutionsService } from '../services';

/**
 * - Solutions Facade
 */
@Injectable({ providedIn: 'root' })
export class SolutionsFacade {
  // Select Solutions
  readonly allSolutions$: Observable<Solution[]> = this._store.select(
    fromSolutions.selectAllSolutions
  );

  // Select Loading
  readonly loading$: Observable<boolean> = this._store.select(
    fromSolutions.selectLoading
  );

  // Select Loaded
  readonly loaded$: Observable<boolean> = this._store.select(
    fromSolutions.selectLoaded
  );

  //  Selected Solution
  selectedSolution$: Observable<Solution | null | undefined | ''> =
    this._store.select(fromSolutions.selectSelectedSolution);

  constructor(
    private readonly _store: Store,
    @Inject(SOLUTIONS_SERVICE)
    private readonly _solutionsService: SolutionsService
  ) {}

  // Load Solutions
  loadSolutions() {
    this.loaded$
      .pipe(take(1))
      .subscribe(
        (loaded) =>
          !loaded && this._store.dispatch(SolutionsActions.loadSolutions())
      );
  }

  /**
   * - Has Solution In Store
   * @param id
   */
  hasSolutionInStore(id: string): Observable<boolean> {
    return this._store.select(fromSolutions.selectSolutionsEntities).pipe(
      take(1),
      map((entities) => entities[id]),
      map((solution) => {
        if (!solution) return false;
        this.selectSolution(id);
        return true;
      })
    );
  }

  /**
   * - Has Solution In API
   * @param id
   */
  hasSolutionInAPI(id: string): Observable<boolean> {
    return this._solutionsService.retrieveSolution(id).pipe(
      take(1),
      map((solution) => {
        if (!solution) return false;

        this._store.dispatch(SolutionsActions.loadSolution({ solution }));
        this.selectSolution(solution.id);

        return true;
      }),
      catchError(() => of(false))
    );
  }

  /**
   * - Select Solution
   */
  selectSolution(id: string | null) {
    this._store.dispatch(SolutionsActions.selectSolution({ id }));
  }
}
