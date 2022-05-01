import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Challenge } from '@lbk/fm/shared';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DashboardFacade } from '../../facade';

@Component({
  selector: 'lbk-my-challenges-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './my-challenges-page.component.html',
  styleUrls: ['./my-challenges-page.component.scss'],
})
export class MyChallengesPageComponent implements OnInit {
  challenges$!: Observable<Challenge[]>;
  inProgressChallenges$!: Observable<Challenge[]>;
  completedChallenges$!: Observable<Challenge[]>;
  loading$!: Observable<boolean | undefined>;

  constructor(
    private readonly _dashboardFacade: DashboardFacade,
    private readonly _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._dashboardFacade.loadDashboard();

    this.loading$ = this._dashboardFacade.loading$;
    this.inProgressChallenges$ = this._dashboardFacade.inProgressChallenges$;
    this.completedChallenges$ = this._dashboardFacade.completedChallenges$;

    this.challenges$ = this._route.queryParams.pipe(
      switchMap((params) => {
        const status = params['status'];
        return status && status === 'completed'
          ? this.completedChallenges$
          : this.inProgressChallenges$;
      })
    );
  }
}
