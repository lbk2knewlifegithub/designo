import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SolutionMinimal } from '@lbk/fm/shared';
import { Observable } from 'rxjs';
import { DashboardFacade } from '../facade';

@Component({
  selector: 'lbk-my-bookmarks',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container-poll">
      <div class="bg-white rounded-lg border p-6">
        <h1 class="font-medium text-3xl">My Bookmarks</h1>

        <div class="mt-3">
          <h3 class="text-secondary text-sm font-medium tracking-widest mt-2">
            SOLUTIONS ({{ bookmarks$ | async | length }})
          </h3>

          <ul
            class="mt-4 grid gap-6 justify-items-center md:grid-cols-2 lg:grid-cols-3"
          >
            <li *ngFor="let solution of bookmarks$ | async | slice: 0:3">
              <lbk-solution-preview
                [shownQuestions]="false"
              ></lbk-solution-preview>
            </li>
          </ul>

          <!-- View All Bookmarks-->
          <a
            routerLink="/dashboard/my-bookmarks"
            class="block mt-10 link link-error"
            >View all</a
          >
          <!-- end View All Bookmarks-->
        </div>
      </div>
    </section>
  `,
})
export class MyBookmarksComponent implements OnInit {
  bookmarks$!: Observable<SolutionMinimal[]>;
  constructor(private readonly _dashboardFacade: DashboardFacade) {}

  ngOnInit() {
    this.bookmarks$ = this._dashboardFacade.bookmarks$;
  }
}
