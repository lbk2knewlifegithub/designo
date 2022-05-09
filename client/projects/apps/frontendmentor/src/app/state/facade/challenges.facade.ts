import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  take,
  tap,
} from 'rxjs';
import {
  Challenge,
  ChallengeQuery,
  ChallengeSort,
  CHALLENGES_SERVICE,
  DIFFICULTIES,
} from '../../shared';
import { ChallengesActions } from '../actions';
import * as fromChallanges from '../selectors/challenges.selectors';
import { ChallengesService } from '../services';

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

  readonly loading$: Observable<boolean> = this._store.select(
    fromChallanges.selectLoading
  );

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
  selectedChallenge$: Observable<Challenge | null | undefined | ''> =
    this._store.select(fromChallanges.selectSelectedChallange);

  constructor(
    private readonly _store: Store,
    @Inject(CHALLENGES_SERVICE)
    private readonly _challengesService: ChallengesService
  ) {}

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

  /**
   * - Has Challenge In Store
   * @param challenge_id
   */
  hasChallengeInStore(id: string): Observable<boolean> {
    return this._store.select(fromChallanges.selectChallangeEntities).pipe(
      map((entities) => entities[id]),
      map((invoice) => !!invoice),
      take(1),
      tap((result) => {
        if (result) this.selectChallenge(id);
      })
    );
  }

  /**
   * - Select Challenge
   */
  selectChallenge(id: string | null) {
    this._store.dispatch(ChallengesActions.selectChallenge({ id }));
  }

  /**
   * - Has Challenge In Api
   * @param challenge_id
   */
  hasChallengeInAPI(id: string): Observable<boolean> {
    return this._challengesService.retrieveChallenge(id).pipe(
      tap((challenge) => {
        if (challenge) {
          this._store.dispatch(ChallengesActions.loadChallenge({ challenge }));
          this.selectChallenge(challenge.id);
        }
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }
}
