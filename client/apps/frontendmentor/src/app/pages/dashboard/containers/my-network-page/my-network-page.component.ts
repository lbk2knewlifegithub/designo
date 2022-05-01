import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserMinimal } from '@lbk/fm/shared';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DashboardFacade } from '../../facade';

@Component({
  selector: 'lbk-my-network-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './my-network-page.component.html',
  styleUrls: ['./my-network-page.component.scss'],
})
export class MyNetworkPageComponent implements OnInit {
  users$!: Observable<UserMinimal[]>;
  followers$!: Observable<UserMinimal[]>;
  following$!: Observable<UserMinimal[]>;
  loading$!: Observable<boolean | undefined>;

  constructor(
    private readonly _dashboardFacade: DashboardFacade,
    private readonly _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading$ = this._dashboardFacade.loading$;
    this.followers$ = this._dashboardFacade.followers$;
    this.following$ = this._dashboardFacade.following$;

    this.users$ = this._route.queryParams.pipe(
      switchMap((params) => {
        const status = params['tab'];
        return status && status === 'following'
          ? this.following$
          : this.followers$;
      })
    );
  }
}
