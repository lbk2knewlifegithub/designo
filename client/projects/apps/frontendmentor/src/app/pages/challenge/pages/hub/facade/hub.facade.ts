import { Injectable } from '@angular/core';
import { Solution, SolutionDTO } from '@lbk/fm/shared';
import { ChallengesFacade } from '@lbk/fm/state';
import { DialogService } from '@ngneat/dialog';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, take } from 'rxjs';
import { HubActions } from '../actions';
import { fromHub } from '../selectors';

/**
 * - Hub Facade
 */
@Injectable({ providedIn: 'root' })
export class HubFacade {
  loadingSolutions$: Observable<boolean> = this._store.select(
    fromHub.selectLoadingSolutions
  );
  loadedSolutions$: Observable<boolean> = this._store.select(
    fromHub.selectLoadedSolutions
  );

  updatingSolution$: Observable<boolean> = this._store.select(
    fromHub.selectUpdatingSolution
  );

  submtingSolution$: Observable<boolean> = this._store.select(
    fromHub.selectCreatingSolution
  );

  selectedSolution$: Observable<Solution | undefined> = this._store.select(
    fromHub.selectSelectedSolution
  ) as Observable<Solution | undefined>;

  constructor(
    private readonly _store: Store,
    private readonly _cf: ChallengesFacade,
    private readonly _ds: DialogService
  ) {}

  /**
   * - Load Solutions For Challenge
   */
  loadSolutionsForChallange() {
    combineLatest([this._cf.selectedChallenge$, this.loadedSolutions$])
      .pipe(take(1))
      .subscribe(([challenge, loaded]) => {
        if (!loaded || !challenge) return;

        const { id } = challenge;

        this._store.dispatch(HubActions.loadSolutionsForChallange({ id }));
      });
  }

  /**
   * - Create Solution
   * @param dto
   * @returns
   */
  createSolution(dto: SolutionDTO) {
    this._cf.selectedChallenge$.subscribe((challenge) => {
      const { id } = challenge || {};
      if (!id)
        return console.error(
          'HubFacade Create solution - No challenge selected'
        );

      this._store.dispatch(HubActions.createSolution({ challengeID: id, dto }));
    });
    return;
  }

  /**
   * - Update Solution
   * @param dto
   * @returns
   */
  updateSolution(dto: SolutionDTO) {
    this._cf.selectedChallenge$.subscribe((challenge) => {
      const { id } = challenge || {};
      if (!id)
        return console.error(
          'HubFacade Update solution - No challenge selected'
        );

      this._store.dispatch(HubActions.updateSolution({ solutionID: id, dto }));
    });
    return;
  }

  deleteSolution(solutionID: string) {
    this._store.dispatch(HubActions.deleteSolution({ id: solutionID }));
  }
}
