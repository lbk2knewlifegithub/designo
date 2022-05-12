import { DialogService } from '@ngneat/dialog';
import { ChallengesFacade } from '@lbk/fm/state';
import { CreateSolutionDTO, Solution } from '@lbk/fm/shared';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable, combineLatest, take } from 'rxjs';
import { fromHub } from '../selectors';
import { HubActions } from '../actions';

/**
 * - Hub Facade
 */
@Injectable({ providedIn: 'root' })
export class HubFacade {
  loadingSolutions$: Observable<boolean> = this._store.select(
    fromHub.selectLoadingSolutions
  );
  creatingChallenge$: Observable<boolean> = this._store.select(
    fromHub.selectCreatingSolution
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
  createSolution(dto: CreateSolutionDTO) {
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
}
