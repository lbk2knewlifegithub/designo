import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Challenge } from '../../shared';
import { ChallengesActions } from '../actions';
import * as fromChallanges from '../selectors/challenges.selectors';

/**
 * - Challenges Facade
 */
@Injectable({ providedIn: 'root' })
export class ChallengesFacade {
  /**
   * - Challenges
   */
  challenges$: Observable<Challenge[]> = this._store.select(
    fromChallanges.selectAllChallenges
  );

  /**
   * - Loaded
   */
  loaded$: Observable<boolean> = this._store.select(
    fromChallanges.selectLoaded
  );

  /**
   * - Selected Challenge
   */
  selectedChallenge$: Observable<Challenge | null | undefined | 0> =
    this._store.select(fromChallanges.selectSelectedChallange);

  constructor(private readonly _store: Store) {}

  /**
   * - Load Challenges
   */
  loadChallenges() {
    this._store.dispatch(ChallengesActions.loadChallenges());
  }
}
