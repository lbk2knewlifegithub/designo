import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-hub-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-sub-header title="Hub">
      <ul class="flex gap-3 text-sm font-medium items-center sm:gap-4 md:gap-6">
        <!-- Overview -->
        <li>
          <a routerLinkActive="active" routerLink="/challenge/hub/overview"
            >Overview</a
          >
        </li>
        <!-- end Overview -->

        <!-- Solutions -->
        <li>
          <a routerLinkActive="active" routerLink="/challenge/hub/solutions"
            >Solutions</a
          >
        </li>
        <!-- end Solutions -->

        <!-- Submit Solution -->
        <li>
          <a
            routerLinkActive="active"
            routerLink="/challenge/hub/submit-solution"
            >Submit Solution</a
          >
        </li>
        <!-- end Submit Solution -->
      </ul>
    </lbk-sub-header>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      a.active {
        @apply border-b-2 border-error;
      }
    `,
  ],
})
export class HubPageComponent {}
