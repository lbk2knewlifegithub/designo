import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map, Observable, take } from 'rxjs';
import { Challenge } from '../../shared';
import { ChallengesActions } from '../actions';
import * as fromChallanges from '../selectors/challenges.selectors';
import { ChallengeQuery, ChallengeSort, DIFFICULTIES } from './../../shared';

/**
 * - Challenges Facade
 */
@Injectable({ providedIn: 'root' })
export class ChallengesFacade {
  private readonly _queries = new BehaviorSubject<ChallengeQuery | undefined>(
    undefined
  );
  set queries(queries: ChallengeQuery | undefined) {
    this._queries.next(queries);
  }
  private readonly queries$: Observable<ChallengeQuery | undefined> =
    this._queries.asObservable();

  /**
   * - Challenges
   */
  challenges$: Observable<Challenge[]> = this._store.select(
    fromChallanges.selectAllChallenges
  );

  /**
   * - Latest Challenges
   */
  latestChallenges$: Observable<Challenge[]> = this.challenges$.pipe(
    map((challenges) => challenges.slice(0, 6))
  );

  /**
   * - Process Challenges
   */
  processedChallenges$: Observable<Challenge[]> = combineLatest([
    this.queries$,
    this.challenges$,
  ]).pipe(
    map(([queries, challenges]) => {
      if (!queries) return challenges;
      let result = [...challenges];

      const types =
        queries.type && queries.type.length > 0 ? queries.type : undefined;

      const difficulties =
        queries.difficulty && queries.difficulty.length > 0
          ? queries.difficulty
          : undefined;

      const languages =
        queries.language && queries.language.length > 0
          ? queries.language
          : undefined;

      const sort = queries.sort;

      // Filter By Types
      if (types) {
        result = result.filter((c) => types.includes(c.type));
      }

      // Filter By Difficulties
      if (difficulties) {
        result = result.filter((c) => difficulties.includes(c.difficulty));
      }

      // Filter By Languages
      if (languages) {
        result = result.filter((c) =>
          c.languages.some((l1) => languages.includes(l1))
        );
      }

      // Sort By Difficulty Ascendent
      if (sort && sort === ChallengeSort.DIFFICULTY_ASC) {
        result = result.sort(
          (c1, c2) => DIFFICULTIES[c1.difficulty] - DIFFICULTIES[c2.difficulty]
        );
      }

      // Sort By Difficulty Descendent
      if (sort && sort === ChallengeSort.DIFFICULTY_DESC) {
        result = result.sort(
          (c1, c2) => DIFFICULTIES[c2.difficulty] - DIFFICULTIES[c1.difficulty]
        );
      }

      return result;
    })
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
    this.loaded$
      .pipe(take(1))
      .subscribe(
        (loaded) =>
          !loaded && this._store.dispatch(ChallengesActions.loadChallenges())
      );
  }
}
