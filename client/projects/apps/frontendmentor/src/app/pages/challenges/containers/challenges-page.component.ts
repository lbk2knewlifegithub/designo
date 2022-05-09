import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Unsubscriber } from '@lbk/comps';
import { DialogService } from '@ngneat/dialog';
import { map, Observable, take } from 'rxjs';
import { Challenge, ChallengeQuery } from '../../../shared';
import { ChallengesFacade } from '../../../state';
import { LearnAboutChallengeComponent } from '../components';

@Component({
  selector: 'lbk-challenges-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './challenges-page.component.html',
})
export class ChallengesPageComponent extends Unsubscriber implements OnInit {
  challenges$!: Observable<Challenge[]>;
  loading$!: Observable<boolean>;
  querys$!: Observable<string[] | undefined>;

  constructor(
    private readonly _challengesFacade: ChallengesFacade,
    private readonly _dialogService: DialogService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this._challengesFacade.loadChallenges();

    this.querys$ = this._route.queryParams.pipe(
      map((queryParams) => {
        return Object.keys(queryParams).length > 0
          ? Object.values(queryParams).flat()
          : undefined;
      })
    );

    this.appendSub = this._route.queryParams.subscribe((queryParams) => {
      this._challengesFacade.queries = queryParams as ChallengeQuery;
    });

    this.challenges$ = this._challengesFacade.processedChallenges$;

    this.loading$ = this._challengesFacade.loading$;
  }

  /**
   * - Learn About Challenge
   */
  learnAboutChallenge() {
    this._dialogService.open(LearnAboutChallengeComponent);
  }

  /**
   * - Remove Query
   */
  removeQuery(query: string) {
    this._route.queryParams.pipe(take(1)).subscribe((queryParams) => {
      const clone = { ...queryParams };
      for (const q in queryParams) {
        const tmp = queryParams[q];
        if (!tmp) continue;

        if (typeof tmp === 'string') {
          if (tmp === query) {
            delete clone[q];
            break;
          }
          continue;
        }

        const filtered = (tmp as string[]).filter((i) => i !== query);

        if (filtered.length !== clone[q].length) {
          clone[q] = filtered;
          break;
        }
      }

      this._router.navigate(['/challenges'], { queryParams: clone });
    });
  }
}
