import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardFacade } from '../facade';
import { Credits } from '../models';

@Component({
  selector: 'lbk-my-credits',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section *ngIf="credits$ | async as credits" class="container-poll">
      <h1 class="font-medium text-3xl">My Credits</h1>
      <ul class="mt-4 grid gap-4 md:grid-cols-3">
        <!-- Premium Credits -->
        <li>
          <span>Premium credits</span>
          <h2>{{ credits.premium }}</h2>
        </li>
        <!-- end Premium Credits-->

        <!-- Design Download Credits -->
        <li>
          <span class="text-sm font-medium text-secondary"
            >Design download credits</span
          >
          <h2>{{ credits.download }}</h2>
        </li>
        <!-- end Design Download Credits -->

        <!-- Screenshot Credits -->
        <li>
          <span>Screenshot credits</span>
          <h2>{{ credits.screenshot }}</h2>
        </li>
        <!-- end Screenshot Credits -->
      </ul>
    </section>
  `,
  styles: [
    `
      ul {
        li {
          @apply bg-white border rounded-lg p-6;
          span {
            @apply text-sm font-medium text-secondary;
          }
          h2 {
            @apply mt-2 font-bold text-3xl;
          }
        }
      }
    `,
  ],
})
export class MyCreditsComponent implements OnInit {
  credits$!: Observable<Credits>;
  constructor(private readonly _dashboardFacade: DashboardFacade) {}

  ngOnInit(): void {
    this.credits$ = this._dashboardFacade.credits$;
  }
}
