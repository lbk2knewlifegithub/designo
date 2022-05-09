import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Challenge } from '@lbk/fm/shared';
import { Observable } from 'rxjs';
import { DashboardFacade } from '../facade';

@Component({
  selector: 'lbk-my-challenges',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container-poll">
      <div class="bg-white rounded-lg border p-6">
        <h1 class="font-medium text-3xl">My Challenges</h1>
        <ul class="mt-3 grid gap-10">
          <!-- In Progess -->
          <li>
            <h3>IN PROGRESS ({{ inProgressChallenges$ | async | length }})</h3>

            <lbk-challenge-preview-list
              [challenges]="(inProgressChallenges$ | async | slice: 0:3)!"
            ></lbk-challenge-preview-list>

            <!-- View All  -->
            <a
              routerLink="/dashboard/my-challenges"
              class="mt-2 link link-error md:mt-4"
              >View all</a
            >
            <!-- end View All  -->
          </li>
          <!-- end In Progess -->

          <!-- Completed -->
          <li>
            <h3>COMPLETED ({{ completedChallenges$ | async | length }})</h3>
            <lbk-challenge-preview-list
              [challenges]="(completedChallenges$ | async | slice: 0:3)!"
            ></lbk-challenge-preview-list>

            <!-- View All Completed Challenges-->
            <a
              routerLink="/dashboard/my-challenges"
              [queryParams]="{ status: 'completed' }"
              class="mt-2 link link-error md:mt-4"
              >View all</a
            >
            <!-- end View All Completed Challenges-->
          </li>
          <!-- end Completed -->
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
            @apply text-secondary text-sm font-bold tracking-widest mt-2;
          }
        }
      }
    `,
  ],
})
export class MyChallengesComponent implements OnInit {
  inProgressChallenges$!: Observable<Challenge[]>;
  completedChallenges$!: Observable<Challenge[]>;
  constructor(private readonly _dashboardFacade: DashboardFacade) {}

  ngOnInit() {
    this.inProgressChallenges$ = this._dashboardFacade.inProgressChallenges$;
    this.completedChallenges$ = this._dashboardFacade.completedChallenges$;
  }
}
