import { Challenge } from '@lbk/fm/shared';
import { OnInit } from '@angular/core';
import { Observable, pluck } from 'rxjs';
import { ChallengesFacade } from '@lbk/fm/state';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-hub-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-sub-header title="Hub">
      <ul class="flex gap-3 text-sm font-medium items-center sm:gap-4 md:gap-6">
        <!-- Overview -->
        <li>
          <a
            routerLinkActive="active"
            [routerLink]="[
              '/challenge/hub',
              (challengeID$ | async)!,
              'overview'
            ]"
            >Overview</a
          >
        </li>
        <!-- end Overview -->

        <!-- Solutions -->
        <li>
          <a
            routerLinkActive="active"
            [routerLink]="[
              '/challenge/hub',
              (challengeID$ | async)!,
              'solutions'
            ]"
            >Solutions</a
          >
        </li>
        <!-- end Solutions -->

        <!-- Submit Solution -->
        <li>
          <a
            routerLinkActive="active"
            [routerLink]="[
              '/challenge/hub',
              (challengeID$ | async)!,
              'submit-solution'
            ]"
            >Submit Solution</a
          >
        </li>
        <!-- end Submit Solution -->
      </ul>
    </lbk-sub-header>

    <!-- Outlet -->
    <router-outlet></router-outlet>
    <!-- Outlet -->
  `,
  styles: [
    `
      a.active {
        @apply border-b-2 border-error;
      }
    `,
  ],
})
export class HubPageComponent implements OnInit {
  challengeID$!: Observable<string>;

  constructor(private readonly _cf: ChallengesFacade) {}

  ngOnInit(): void {
    this.challengeID$ = (
      this._cf.selectedChallenge$ as Observable<Challenge>
    ).pipe(pluck('id'));
  }
}
