import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserMinimal } from '@lbk/fm/shared';
import { Observable } from 'rxjs';
import { DashboardFacade } from '../../facade';

@Component({
  selector: 'lbk-my-network',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container-poll ">
      <div class="bg-white rounded-lg border p-6">
        <h1 class="font-medium text-3xl">My Network</h1>
        <ul class="mt-3 grid gap-10">
          <!-- Followers -->
          <li>
            <h3>FOLLOWERS ({{ followers$ | async | length }})</h3>

            <lbk-user-list
              [users]="(followers$ | async | slice: 0:8)!"
            ></lbk-user-list>

            <!-- View All Followers-->
            <a routerLink="/dashboard/my-network" class="mt-2 link link-error"
              >View all</a
            >
            <!-- end View All Followers-->
          </li>
          <!-- end Followers -->

          <!-- Following -->
          <li>
            <h3>FOLLOWING ({{ following$ | async | length }})</h3>

            <lbk-user-list
              [users]="(followers$ | async | slice: 0:8)!"
            ></lbk-user-list>

            <!-- View All  Following -->
            <a
              routerLink="/dashboard/my-network"
              [queryParams]="{ tab: 'following' }"
              class="mt-2 link link-error"
              >View all</a
            >
            <!-- end View All  Following -->
          </li>
          <!-- end Following -->
        </ul>
      </div>
    </section>
  `,
  styles: [
    `
      ul {
        li {
          @apply grid gap-4;
          h3 {
            @apply text-secondary text-sm font-medium tracking-widest mt-2;
          }
        }
      }
    `,
  ],
})
export class MyNetworkComponent implements OnInit {
  followers$!: Observable<UserMinimal[]>;
  following$!: Observable<UserMinimal[]>;
  constructor(private readonly _dashboardFacade: DashboardFacade) {}

  ngOnInit() {
    this.followers$ = this._dashboardFacade.followers$;
    this.following$ = this._dashboardFacade.following$;
  }
}
